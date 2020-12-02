<template>
    <div class="card bg-dark text-white">
        <img class="card-img" src="@/assets/200.gif" alt="Card image">
        <div class="card-img-overlay">
            <div id="app"  >  
                <div class="container ">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
                            <div class="panel panel-info">
                                <div class="panel-heading">
                                    <h3 class="panel-title">
                                        <a class="navbar-brand-lg" href="/lecturas"><img src="@/assets/logohead.png" width="50" height="50" ></a>
                                        Profile   
                                    </h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-xs-6 col-sm-6 col-md-6 separator social-login-box"> <br>
                                        <img alt="" class="img-thumbnail" src="@/assets/user.png">                        
                                        </div>
                                        <div style="margin-top:80px;" class="col-xs-6 col-sm-6 col-md-6 login-box">
                                        <div class="form-group">
                                            <p class="text-primary" v-for="Ruser in responseData" v-bind:key="Ruser.id">Name: {{Ruser.nombre}} </p>
                                            <div class="input-group" >     
                                            <div class="input-group-addon"></div>
                                                <input v-model="pname" class="form-control" type="name" New Name="New name" placeholder="New Name">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <p class="text-primary" v-for="Ruser in responseData" v-bind:key="Ruser.id">Cell Cellphone: {{Ruser.cell_phone}}</p>
                                            <div class="input-group"> 
                                            <div class="input-group-addon" ></div>
                                            <input v-model="pcellphone" class="form-control" type="cellphone" placeholder="New cellphone">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <p class="text-primary" > confirm your current password:</p>
                                            <div class="input-group"> 
                                            <div class="input-group-addon" ></div>
                                            <input v-model="ppassword" class="form-control" type="password" placeholder="Password">
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-footer">
                                    <div class="row">
                                        <div class="col-xs-6 col-sm-6 col-md-6"></div>
                                        <div class="col-xs-6 col-sm-6 col-md-6">
                                            <button class="btn icon-btn-save btn-success" v-on:click="fboton2()" type="submit">
                                            <span  class="btn-save-label"><i class="glyphicon glyphicon-floppy-disk"></i></span>save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
    import AuthService from '@/service/Authservice.js'
    export default {
        name: 'ChangeProfile', 
        data(){
            return{
                responseData : null,
                email: null,
                token: null,
                ppassword: null,
                pname: null,
                pcellphone: null
                
            }
        },
        methods:{
            
            async fboton1(){
                try {
                    const datos = {
                        char : localStorage.getItem('email'),
                    }
                    console.log( datos.email)
                    const response = await AuthService.alphabeticalUsers(datos);
                    this.responseData = response;
                    console.log(this.responseData)
                    
                } catch (error) {
                    alert(this.responseData)
                }       
            },async fboton2(){
                try {
                    const datos = {
                        email : localStorage.getItem('email'),
                        password: this.ppassword,
                        nombre: this.pname,
                        cell_phone: this.pcellphone,
                        
                    }
                    console.log( datos.password)
                    const response = await AuthService.ChangeProfile(datos);
                    this.responseData = response;
                    console.log(this.responseData)
                    alert(this.responseData.mensage);
                    if(this.responseData.mensage == 'contraseña incorrecta'){
                        window.location.href = "/ChangeProfile";
                    }else{
                         window.location.href = "/lecturas";
                    }
                } catch (error) {
                    alert(this.responseData)
                }       
            },
            

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
        margin-left: 100px !important;
        margin-right: 100px !important;
    }


</style>