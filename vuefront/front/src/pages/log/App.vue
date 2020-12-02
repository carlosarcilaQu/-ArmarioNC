<template>
<div class="card bg-dark text-white">
        <img class="card-img" src="@/assets/200.gif" alt="Card image">
        <div class="card-img-overlay">
            <div id="app"  >     
                <div class=" px-3 form-signin">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand-lg" href="/lecturas"><img src="@/assets/logohead.png" width="100" height="100" ></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                            <h3>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <h3>Profile</h3>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="/Changepassword"><h3>Change Password</h3></a>
                                <a class="dropdown-item" href="/ChangeProfile"><h3>Edit my Profile</h3></a>
                                <a class="dropdown-item" v-on:click='fbotonl()'><h3>Log off</h3></a>
                                </div>
                            </li>
                            </h3>
                            <h3>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <h3>records</h3>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="/DataDate"><h3>search by date</h3></a>
                                <a class="dropdown-item" href="/consumptionLEDS"><h3>monthly consumption</h3></a>
                                
                                </div>
                            </li>
                            </h3>
                            <a class="nav-item nav-link disabled" href="#"><h3>Administration</h3></a>
                            </div>
                        </div>
                        <div class="col-md-1"></div>
                    </nav>
                    
                    <h3>
                        ¡WELCOME! 
                        <br>
                        Here you can see how your plants are
                    </h3> 
                    
                    <table v-on:output='fboton1()' class="table table-dark">
                        <thead>
                            <tr> 
                                <th scope= "col"><h3>Temperature</h3></th>
                                <th scope= "col"><h3>Humidity</h3></th>
                                <th scope= "col"><h3>Wather</h3></th>
                                <th scope= "col"><h3>LEDS</h3></th>
                                <th scope= "col"><h3>Date</h3></th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr v-for="Rmatera in responseData" v-bind:key="Rmatera.id">
                            <th scope = "row"><h3>{{Rmatera.Temperatura}}</h3></th>
                            <th><h3>{{Rmatera.Humedad}}</h3></th>
                            <th><h3>{{Rmatera.Agua}}</h3></th>
                            <th><h3>{{Rmatera.Leds}}</h3></th>
                            <th><h3>{{Rmatera.date}}</h3></th>
                        </tr>
                    </tbody>
                    </table>
                    <div class="alert alert-danger" role="alert">
                        <h3>
                            Higher than desired temperatures were recorded!
                        </h3> 
                    </div>
                     <table v-on:output='fboton2()' class="table table-dark">
                        <thead>
                            <tr> 
                                <th scope= "col"><h3>Temperature</h3></th>
                                <th scope= "col"><h3>LEDS</h3></th>
                                <th scope= "col"><h3>Date</h3></th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr v-for="Rmatera1 in responseData1" v-bind:key="Rmatera1.id">
                           
                            <th scope = "row"><h3>{{Rmatera1.Temperatura}}</h3></th>
                            <th><h3>{{Rmatera1.Leds}}</h3></th>
                            <th><h3>{{Rmatera1.date}}</h3></th>
                        </tr>
                    </tbody>
                    </table>
                    <div class="alert alert-danger" role="alert">
                        <h3>
                            dangerous humidity has been registered, check that the water supply is good
                        </h3> 
                    </div>
                     <table v-on:output='fboton2()' class="table table-dark">
                        <thead>
                            <tr>
                                <th scope= "col"><h3>Humidity</h3></th>
                                <th scope= "col"><h3>Wather</h3></th>
                                <th scope= "col"><h3>Date</h3></th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr v-for="Rmatera1 in responseData2" v-bind:key="Rmatera1.id">
                           
                            <th scope = "row"><h3>{{Rmatera1.Temperatura}}</h3></th>
                            <th><h3>{{Rmatera1.Humedad}}</h3></th>
                            <th><h3>{{Rmatera1.date}}</h3></th>
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
        name: 'lecturas', 
        data(){
            return{
                responseData2 : null,
                responseData1 : null,
                responseData : null,
                email: null,
                token: null,
                e: 0
                
            }
        },
        methods:{
            
            async fboton1(){
                try {
                    const datos = {
                        email : localStorage.getItem('email'),
                    }
                    console.log( datos.email)
                    const response = await AuthService.lecturas(datos);
                    this.responseData = response;
                    console.log(this.responseData)
                    
                } catch (error) {

                    alert(this.responseData)
                }       
            },
            async fboton3(){
                try {
                    const datos = {
                        email : localStorage.getItem('email'),
                    }
                    console.log( datos.email)
                    const response2 = await AuthService.humidityhigh(datos);
                    this.responseData2 = response2;
                    console.log(this.responseData2)
                    
                } catch (error) {

                    alert(this.responseData2)
                }       
            },
            async fboton2(){
                try {
                    const datos = {
                        email : localStorage.getItem('email'),
                    }
                    console.log( datos.email)
                    const response1 = await AuthService.temperaturehigh(datos);
                    this.responseData1 = response1;
                    console.log(this.responseData1)
                    
                } catch (error) {

                    alert(this.responseData1)
                }       
            },
            fbotonl(){
                localStorage.removeItem('email')
                localStorage.removeItem('token')
                window.location.href = "/usuarioss";
            }
   
        },
        created: function(){
            this.fboton1()
            this.fboton2()
            this.fboton3()
        }




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