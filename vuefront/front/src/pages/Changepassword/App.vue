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

                                        Change password   
                                    </h3>
                                    
                                </div>
                                
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-xs-6 col-sm-6 col-md-6 separator social-login-box"> <br>
                                        <img alt="" class="img-thumbnail" src="@/assets/user.png">                        
                                        </div>
                                        <div style="margin-top:80px;" class="col-xs-6 col-sm-6 col-md-6 login-box">
                                        <div class="form-group">
                                            <div class="input-group">
                                            <div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div>
                                                <input v-model="ppassword" class="form-control" type="password" placeholder="Current Password">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                            <div class="input-group-addon"><span class="glyphicon glyphicon-log-in"></span></div>
                                            <input v-model="pnpassword" class="form-control" type="password" placeholder="New Password">
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-footer">
                                    <div class="row">
                                        <div class="col-xs-6 col-sm-6 col-md-6"></div>
                                        <div class="col-xs-6 col-sm-6 col-md-6">
                                            <button class="btn icon-btn-save btn-success" v-on:click="fboton1()" type="submit">
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
                ppassword:null,
                pnpassword: null
                
            }
        },
        methods:{
            
            async fboton1(){
                try {
                    const datos = {
                        email : localStorage.getItem('email'),
                        password: this.ppassword,
                        newPassword : this.pnpassword
                    }
                    console.log( datos.email)
                    const response = await AuthService.Changepassword(datos);
                    this.responseData = response;
                    console.log(this.responseData)
                    alert(this.responseData.mensage);
                    window.location.href = "/lecturas";
                } catch (error) {

                    alert(this.responseData)
                }       
            },
   
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
      
    }body{
    background:rgb(255, 255, 255);
    }
    .separator {
        border-right: 1px solid #ffffff; 
    }
    .icon-btn-save {
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-group {
        margin-bottom:10px; 
    }
    .btn-save-label {
        position: relative;
        left: -12px;
        display: inline-block;
        padding: 6px 12px;
        background: rgba(0,0,0,0.15);
        border-radius: 3px 0 0 3px;
    }


</style>