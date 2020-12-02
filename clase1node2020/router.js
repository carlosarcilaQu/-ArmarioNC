const jwExpirySeconds = 3600
const llave = 'mykey';
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var md5 = require('md5');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
arraytmp = [];
var usuarios =[]



var conection_string = 'mongodb+srv://carlos:11C@rlos06@cluster0.xzjah.mongodb.net/armario?retryWrites=true&w=majority'

mongoose.connect(conection_string, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, res) {
    if(err){
        console.log(err)
    }else{
        console.log('Conectado a Atlas')
    }
})

var nameSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    cell_phone: String, 
    password: String,
    gender: String,
    ID_rol: Number,
    date: Date
})

var nameMatera = new mongoose.Schema({
    Nplantas : Number,
    Conexion: String
})

var nameRegistro = new mongoose.Schema({
    email : String,
    date: Date,
    Temperatura : Number,
    Humedad	: Number,
    Agua : String,
    Leds : String,
    consum : Number
    
})


var reg = mongoose.model("usuarios", nameSchema);
var reg1 = mongoose.model("Materas", nameMatera);
var reg2 = mongoose.model("Lecturas", nameRegistro);

router.use(function(req,res,next){
    const token = req.headers['token'];
    console.log(token)
    console.log(req.originalUrl)
    if(req.originalUrl == '/api/usuarioss' || req.originalUrl == '/api/registro'){
        next();
    }else{
        jwt.verify(token,llave,(err, decoded)=>{
            if(err){
                return res.json({mensaje : 'Token invalida'});
            }else{
                req.decoded = decoded;
                console.log(decoded)
                next();
            }
        });
    }
});


router.get('/saludo/:nombre', (req, res, next)=>{
    console.log('hicieron un req a saludo')
    console.log(req.params)
    let payload ={
        'id' : 1,
        'mensaje' : 'que mas pa ' + req.params.nombre
    }
    res.send(payload)
})

router.get('/hora', (req, res, next)=>{
    var hora = getDateTime()
    console.log(hora)
    let payload ={
        'id' : 2,
        'hora' : hora
    }
    res.send(payload)
})

router.get('/temperature/:tmp', (req, res, next)=>{
    console.log("se a hecho req")
    console.log(req.params)
    var temperature = req.params.tmp
    let payload ={
        'temperature' : temperature,
        'menssage' : "se midio correctamente"
    }
    arraytmp.push(payload)
    res.send(payload)
})



router.post('/placa',(req, res, next) =>{

    console.log(req.body)

    var payload ={
        "mensaje": "ok"
    }
    var datosUsuario = req.body;
    console.log(datosUsuario.password);
    datosUsuario.password = md5(datosUsuario.password);
    console.log(datosUsuario.password);
    res.send(payload)
})







router.post('/registro',(req, res, next) =>{
    console.log(req.body)

    var datos = req.body;

    reg.findOne({
        'email' : datos.email,
    }).then(data =>{
        var payload = {
            "mensaje" : "USUARIO YA EXITE"
        }
        if(data.email == data.email ){
            res.send(payload )
        }          
    }).catch(err =>{
        bcrypt.hash(datos.password,10,function(err,hash){
            var datosconhash = {
            'nombre': datos.nombre,
            'email': datos.email,
            'cell_phone': datos.cell_phone,
            'password': hash,
            'ID_rol' : datos.ID_rol,
            'gender' : datos.gender
            }
            const payload = {
                email : datosconhash.email
            };
            const token = jwt.sign(payload,llave,{
                algorithm : 'HS256',
                expiresIn: jwExpirySeconds
            });
            res.json({
                email: datosconhash.email,
                mensaje: 'OK',
                token:token
            });
            var myData = new reg(datosconhash);
            myData.save().then(item => {
                console.log("Guardado exitoso");
                
            })
            .catch(err => {
                console.log("Error al guardar la informacion")
                var payload = {
                    "mensaje" : "ERROR"
                }
                res.send(payload)
            })
        });  
    })    
    

   /*
    var myData = new reg(datosUsuario);
    myData.save().then(item =>{
        console.log("guardado")
        payload.mensaje = "registro guardado"
        res.send(payload)
    })
    .catch(err => {
        console.log("no se pudo guardar")
        payload.mensaje = "no se pudo guardar";
        res.send(payload)
    })*/
    
})



router.post('/usuarioss', (req, res, next)=>{
    var datos = req.body;
    var query  = {
        $and:[
        {email : datos.email},
       // {contraseña : datos.contraseña}
    ]
    }
    reg.findOne(query,function(err,result){                
        if(err){
            console.log("Error en el ingreso");
            const payload = {
                'mensaje' : 'Error'
            };
            res.send(payload);        
        }else{
            console.log("Consulta sin error");
            if(result){
                bcrypt.compare(datos.password, result.password, function(err, resultado) {
                    if(resultado) {
                        const payload = {
                            email : result.email
                        };
                        const token = jwt.sign(payload,llave,{
                            algorithm : 'HS256',
                            expiresIn: jwExpirySeconds
                        });
                        res.json({
                            email: result.email,
                            mensaje: 'Autenticacion correcta',
                            token:token
                        });

                    } else {
                        const payload = {
                            'mensaje' : 'contraseña incorrecta '
                        };
                        res.send(payload )
                    } 
                  });
                
            }else{
                const payload = {
                    'mensaje' : 'No se puede ingresar'
                };
                res.send(payload )
            }                       
        }
    })  
})

router.post('/validar',router,function(res){
    if(err){
       var payload={
           "mensaje" : "session expired"
    }
    res.send(payload)
    }else{
       var payload={
           "mensaje" : "OK"
    }
    res.send(payload)
    }

})

router.post('/materas',(req, res, next) =>{

    console.log(req.body)

    var payload ={
        "mensaje": "ok"
    }
    var datosMatera = req.body;


    var myData1 = new reg1(datosMatera);
    myData.save().then(item =>{
        console.log("guardado")
        payload.mensaje = "registro guardado"
        res.send(payload)

    })
    .catch(err => {
        console.log("no se pudo guardar")
        payload.mensaje = "no se pudo guardar";
        res.send(payload)
    })
    
})

router.post('/registros',(req, res, next) =>{

    console.log(req.body)

    var payload ={
        "mensaje": "ok"
    }
    var datosMatera = req.body;
    datosMatera.date = new Date();
    var myData2 = new reg2(datosMatera);
    myData2.save().then(item =>{
        console.log("guardado")
        payload.mensaje = "registro guardado"
        res.send(payload)

    })
    .catch(err => {
        console.log("no se pudo guardar")
        payload.mensaje = "no se pudo guardar";
        res.send(payload)
    })
    
})




router.post('/alphabeticalUsers', (req, res, next)=>{
    var char = req.body.char
   
    let payload ={
        'menssage' : "ok"
    }
    reg.find({
        "email": {$regex: '^' + char, $options: 'i'}
    }).then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err =>{
        console.log('an error has been ocurred sorry :(')
        res.send(payload)
    })
})


router.post('/DateData', (req, res, next)=>{
   var email = req.body.email
    var fdate = req.body.fdate
    var ldate = req.body.ldate
   
    reg2.find({
        "email": email,
        "date":{ 
            $gte: fdate, 
            $lt: ldate
        }
    }).then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err =>{
        let payload ={
            'mensaje' : 'Please enter the date in the specified format or enter a valid date'
        }
        res.send(payload)
    })
})

router.post('/deleteUser', (req, res, next)=>{
    var email = req.body.email
    var password = req.body.password
    var ObjectId = require('mongodb').ObjectID;

    var datos = req.body;

    var query  = {email : datos.email};
    reg.remove(query,function(err,result){
        if(err){
            console.log("Error al eliminar");
            res.send("Error");
        }else{
            reg2.find({
                'email' : datos.email
            }).then(data =>{
                reg2.deleteMany({email : datos.email}).then(data =>{
                    console.log("Eliminado exitoso");
                    res.send(result);
                })
            })
                
        }
    });




  /*  reg.find({
        'email' : email

    }).then(data =>{
        mareg.deleteOne({eil : email}).then(data =>{
            console.log(data)
            res.send(data)
        }).then(data =>{
            reg2.find({
                'email' : email
            }).then(data =>{
                reg2.deleteMany({email : email}).then(data =>{
                    console.log(data)
                    res.send(data)
                })
            })         
        }).catch(err =>{
            console.log('an error has been ocurred sorry :(')
            res.send('error')
        })
        
    }).catch(err =>{
        res.send('No se puede eliminar al usuario')
        
    })

    

    /*reg.deleteOne({_id: ObjectId("5fb8277126bb022b64a9c6bc")}).then(data =>{
        console.log(data)
         res.send(data)
    }).catch(err =>{
        console.log('an error has been ocurred sorry :(')
        res.send(payload)
    })*/
 })

router.post('/temperaturehigh', (req, res, next)=>{

    var email = req.body.email
    reg2.find({
        'email': email,
        'Temperatura':{
            $gt:  22 
        }
    }).sort({"date" : -1}).limit().then(data=>{
        res.send(data)
    })

})

router.post('/lecturas', (req, res, next)=>{

    var email = req.body.email
    reg2.find({
        'email': email,
 
    }).sort({"date" : -1}).limit().then(data=>{
        res.send(data)
    })

})

router.post('/humidityhigh', (req, res, next)=>{

    var email = req.body.email
    reg2.find({
        'email': email,
        'Humedad':{
            $lt: 50  
        }
    }).sort({"date" : -1}).limit().then(data=>{
        res.send(data)
    })

})



router.post('/consumptionLEDS', (req, res, next)=>{

    var email = req.body.email
    var date = new Date();
    reg2.aggregate([
        {$match:
            {
                'Leds': 'S',
                'email' : email,
                
            } 
        },
        {
            $group: {
                _id: { Month : {$month : "$date"}, year: { $year: "$date" } },
                consumoT: { $sum:  "$consum" },

            }
        }
    ]).then(data =>{
        res.send(data)
    });


 /*aggregate([
            {
                $group: {
                    _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
                    consumoT: { $sum:  "$consum" },
                }
            }
        ]).then(data =>{
            res.send(data)
    });*/
})

router.post('/Changepassword', (req, res, next)=>{
    var datos = req.body;

    reg.findOne({
        "email" : datos.email
    }).then(data=>{
        bcrypt.compare(datos.password,data.password,function(err,resultado){
            if(resultado){
                bcrypt.hash(datos.newPassword,10,function(err,hash){
                    var datosconhash = {
                        'newPassword': hash,
                        }
                    reg.updateOne({"email" : datos.email},
                         {"password": datosconhash.newPassword}   
                    ).then(data=>{
                        let payload ={
                            'mensage' : "data save"
                        }
                        res.send(payload)
                    })
                })
            }else{
                let payload ={
                    'mensage' : 'contraseña incorrecta'
                }
                res.send(payload)
            }
        })
    }).catch(err =>{
        let payload ={
            'mensage' : "no se puede realizar la accion"
        }
        res.send(payload)
    })
    
})



router.post('/ChangeProfile', (req, res, next)=>{
    var datos = req.body;

    reg.findOne({
        "email" : datos.email
    }).then(data=>{
        bcrypt.compare(datos.password,data.password,function(err,resultado){
            if(resultado){
                var datosconhash = {
                    'nombre': datos.nombre,
                    'cell_phone' : datos.cell_phone,
                    }
                reg.update({"email" : datos.email},
                    {$set : {
                        "cell_phone": datosconhash.cell_phone,
                        "nombre": datosconhash.nombre
                        }
                    }
                ).then(data=>{
                    let payload ={
                        'mensage' : "data save"
                    }
                    res.send(payload)
                })
                
            }else{
                let payload ={
                    'mensage' : 'contraseña incorrecta'
                }
                res.send(payload)
            }
        })
    }).catch(err =>{
        let payload ={
            'mensage' : "no se puede realizar la accion"
        }
        res.send(payload)
    })
    
})




function getDateTime(){
    var date = new Date()
    return date
}

module.exports = router;