import axios from 'axios'
const url ='http://localhost:15002/api/'
export default{
    usuarioss(datos){
        return axios 
            .post(url + 'usuarioss',datos)
            .then(response => response.data)
    },
    registro(datos){
        return axios 
            .post(url + 'registro',datos)
            .then(response => response.data)
    },
    lecturas(datos){
        return axios 
            .post(url + 'lecturas',datos,{
              headers: {
                  'token' : localStorage.getItem('token')
              }  
            }).then(response => response.data)
    },
    ChangeProfile(datos){
        return axios 
            .post(url + 'ChangeProfile',datos,{
              headers: {
                  'token' : localStorage.getItem('token')
              }  
            }).then(response => response.data)
    },
    alphabeticalUsers(datos){
        return axios 
            .post(url + 'alphabeticalUsers',datos,{
              headers: {
                  'token' : localStorage.getItem('token')
              }  
            }).then(response => response.data)
    },
    Changepassword(datos){
        return axios 
            .post(url + 'Changepassword',datos,{
              headers: {
                  'token' : localStorage.getItem('token')
              }  
            }).then(response => response.data)
    },
    DateData(datos){
        return axios 
            .post(url + 'DateData',datos,{
              headers: {
                  'token' : localStorage.getItem('token')
              }  
            }).then(response => response.data)
    },
    consumptionLEDS(datos){
        return axios 
            .post(url + 'consumptionLEDS',datos,{
              headers: {
                  'token' : localStorage.getItem('token')
              }  
            }).then(response => response.data)
    },
    temperaturehigh(datos){
        return axios 
            .post(url + 'temperaturehigh',datos,{
              headers: {
                  'token' : localStorage.getItem('token')
              }  
            }).then(response => response.data)
    },
    humidityhigh(datos){
        return axios 
            .post(url + 'humidityhigh',datos,{
              headers: {
                  'token' : localStorage.getItem('token')
              }  
            }).then(response => response.data)
    },
}