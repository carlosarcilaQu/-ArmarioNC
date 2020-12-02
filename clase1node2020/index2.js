const fs = require('fs')
/*
var payload = {
    "name" : "carlos",
    "surname" : "arcila",
    "Yr" : 37
}

var arreglo_json = [];

for(var i = 0; i<10; i++){
    payload.Yr = payload.Yr + 1;
    var payload1 = JSON.parse(JSON.stringify(payload));
    //console.log(payload1)
    arreglo_json.push(payload1)
}

var texto = JSON.stringify(arreglo_json)

//console.log(arreglo_json)
//console.log(texto)

fs.writeFileSync('datos.json', texto);
*/

fs.readFile('datos.json', (err, data)=>{
    if(err){
        console.log(err)
    }else{
        let data_leidos = JSON.parse(data)
        console.log(data_leidos);
    }
})