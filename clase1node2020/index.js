const axios = require ('axios')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 15002;

app.use(cors())
app.use(bodyParser.json())

const router = require('./router.js')
app.use('/api',router)
app.listen(PORT, () =>console.log('server port: ' + PORT))











/*
axios.get('https://api.openbrewerydb.org/breweries')
    .then(response =>{
        let datos = response.data 
        let payload = {
            "nombre" : "Carlos",
            "apellido" : "arcila",
            "facultad" : "electronica"

        }
        console.log(payload)
        console.log(datos)
    })
    .catch(error =>{
        console.log(error)
    })
    */