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
                                <a class="dropdown-item" href="#"><h3>Profile</h3></a>
                                </div>
                            </li>
                            </h3>
                            <h3>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <h3>Registros</h3>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="/DataDate"><h3>search by date</h3></a>
                                <a class="dropdown-item" href=""><h3>monthly consumption</h3></a>
                                
                                </div>
                            </li>
                            </h3>
                            <a class="nav-item nav-link disabled" href="#"><h3>Home</h3></a>
                            </div>
                        </div>
                        <button v-on:click='fbotonl()' type="button" class="btn-lg btn-dark">Log off</button>
                    </nav>
                    <h3>
                        ¡Here is your monthly consumption!! 
                        <br>
                    </h3> 
                    <table v-on:output='fboton1()' class="table table-dark px-4">
                        <thead>
                            <tr> 
                                <th scope= "col"><h3>consumption</h3></th>
                                <th scope= "col"><h3>Month</h3></th>
                                <th scope= "col"><h3>Year</h3></th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr v-for="Rmatera in responseData" v-bind:key="Rmatera.id">
                            <th scope = "row"><h3>{{Rmatera.consumoT}} </h3></th>
                            <th><h3>{{Rmatera._id.Month}}</h3></th>
                            <th><h3>{{Rmatera._id.year}}</h3></th>
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
        name: 'consumptionLEDS', 
        data(){
            return{
                responseData : null,
                email: null,
                token: null,
                
            }
        },
        methods:{
            
            async fboton1(){
                try {
                    const datos = {
                        email : localStorage.getItem('email'),
                    }
                    console.log( datos.email)
                    const response = await AuthService.consumptionLEDS(datos);
                    this.responseData = response;
                    console.log(this.responseData)
                    
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
        created: function(){
            this.fboton1()
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
        padding-left: 100px !important;
        padding-right: 100px !important;
    }


</style>