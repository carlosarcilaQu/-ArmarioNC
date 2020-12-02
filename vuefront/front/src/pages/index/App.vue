<template>
    <div class="card bg-dark text-white">
        <img class="card-img" src="@/assets/200.gif" alt="Card image">
        <div class="card-img-overlay">
        <div id="app" >
            <div class="px-3 form-signin ">
                <div class="text-center mb-4">
                    <img class="mb-4" src="@/assets/logohead.png" alt="" width="150" height="150">

                    <h4 class="h3">LOG IN</h4>
                </div>
                <div class="form-group">
                    <input type="email" id="inputEmail" v-model="pEmail" class="form-control" placeholder="EMAIL" required>
                    <label for="inputEmail">EMAIL</label>
                </div>
                <div class="form-group">
                    <input type="password" id="inputPassword" v-model="pPassword" class="form-control" placeholder="Contraseña" required>
                    <label for="inputPassword">PASSWORD</label>
                </div>
                <button v-on:click="fboton1()" class="btn btn-dark btn-primary btn-block" type="submit">LOGIN</button>
                <div class="text-center mb-4">
                    <h2 class="h3">or</h2>
                </div>
                <button v-on:click="fboton2()" class="btn btn btn-success btn-primary btn-block" type="submit">Register</button>
            </div>
        </div>
        </div>
    </div>




</template>

<script>
    import AuthService from '@/service/Authservice.js'
    export default {
        name: 'usuarioss', 
        data(){
            return{
                pEmail : null,
                pPassword : null,
                responseData : null,
            }
        },
        methods:{
            async fboton1(){
                try {
                    const datos = {
                        email: this.pEmail,
                        password: this.pPassword
                    }
                    const response = await AuthService.usuarioss(datos);
                    this.responseData = response;
                    console.log(this.responseData)
                    if(this.responseData.mensaje == "Autenticacion correcta"){
                        const token = this.responseData.token;
                        const email = this.responseData.email;
                        localStorage.setItem("token", token);
                        localStorage.setItem("email", email);
                        window.location.href = "/lecturas";
                    }else{
                        alert(this.responseData.mensaje);
                    }
                    
                } catch (error) {

                    alert(this.responseData.mensaje)
                }       
            },
            fboton2(){
                window.location.href = "/registro";
            }
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
    .px-3 {
        padding-left: 500px !important;
        padding-right: 500px !important;
    }
    
    
    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
            font-size: 3.5rem;
        }
    }
    #app {
      width: 100%;
    }
</style>