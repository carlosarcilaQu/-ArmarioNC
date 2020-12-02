<template>
<div class="card bg-dark text-white">
        <img class="card-img" src="@/assets/200.gif" alt="Card image">
        <div class="card-img-overlay">
            <div id="app"  >     
                <div class=" px-3 form-signin">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand-lg" href="/lecturas"><img src="@/assets/logohead.png" width="100" height="100" ></a>
                        <div class="col-md-1"></div>
                        <div class="form-group"> <!-- Date input -->
                            <label class="text-primary" ><h3>Firts Date</h3></label>
                            <input v-model="pprimera" type="Name" format= "YYYY-MM-DD" class="form-control" id="exampleFormControlInput1" placeholder="YYYY-MM-DD" required>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="form-group"> <!-- Date input -->
                            <label class="text-primary"><h3>Last Date</h3></label>
                            <input v-model="psegunda" type="Name" format= "YYYY-MM-DD" class="form-control" id="exampleFormControlInput1" placeholder="YYYY-MM-DD" required>
                        </div>
                        <div class="col-md-1"></div>
                        <button v-on:click='fboton1()' type="button" class="btn-lg btn-dark">Search</button>
                        <div class="col-md-1"></div>
                        <button v-on:click='fbotonl()' type="button" class="btn-lg btn-dark">Log off</button>
                    </nav>
                    <h3>
                        ¡WELCOME! 
                        <br>
                        Here you can see how your plants are
                    </h3> 
                    <table  class="table table-dark">
                        <thead>
                            <tr> 
                                <th scope= "col">Temperature</th>
                                <th scope= "col">Humidity</th>
                                <th scope= "col">Wather</th>
                                <th scope= "col">LEDS</th>
                                <th scope= "col">Date</th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr v-for="Rmatera in responseData" v-bind:key="Rmatera.id">
                            <th scope = "row">{{Rmatera.Temperatura}}</th>
                            <th>{{Rmatera.Humedad}}</th>
                            <th>{{Rmatera.Agua}}</th>
                            <th>{{Rmatera.Leds}}</th>
                            <th>{{Rmatera.date}}</th>
                        </tr>
                    </tbody>
                    </table>
                </div>               
            </div>
        </div>
    </div>
</template>

<script>
    
    import AuthService from '@/service/Authservice.js'
    export default {
        name: 'DataDate', 
        data(){
            return{
                responseData : null,
                email: null,
                token: null,
                pprimera: null,
                psegunda: null
                
            }
        },
        methods:{
            
            async fboton1(){
                try {
                    const datos = {
                        email : localStorage.getItem('email'),
                        fdate : this.pprimera,
                        ldate : this.psegunda
                    }
                    const response = await AuthService.DateData(datos);
                    this.responseData = response;
                    console.log(this.responseData)
                    if(this.responseData.mensaje == 'Please enter the date in the specified format or enter a valid date'){
                        alert(this.responseData.mensaje);
                    }else{
                        alert('the dates found were the following:');
                    }
                    
                } catch (error) {

                    alert(this.responseData)
                }       
            },
            fbotonl(){
                localStorage.removeItem('email')
                localStorage.removeItem('token')
                window.location.href = "/usuarioss";
            }

   
        },
        




    }
    
</script>

<style>
    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
            font-size: 3.5rem;
        }
    }
    #app {
      width: 100%;
      
    }
    .px-3 {
        padding-left: 100px !important;
        padding-right: 100px !important;
    }.px-4 {
        margin-left: 100px !important;
        margin-right: 100px !important;
    }


</style>