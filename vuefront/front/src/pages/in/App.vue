<template>
    <div class="card bg-dark text-white">
        <img class="card-img" src="@/assets/200.gif" alt="Card image">
        <div class="card-img-overlay">
            <div id="app">
                <div class="px-3 form-signin">
                    <div class="text-center">
                        <img class="mb-4" src="@/assets/logohead.png" alt="" width="150" height="150">
                        <h1 class="h3 mb-3 font-weight-normal">REGISTER</h1>
                    </div>
                        <form>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Name</label>
                                <input v-model="pnombre" type="Name" class="form-control" id="exampleFormControlInput1" placeholder="Name" required>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Email address</label>
                                <input v-model="ppmail" type="email" class="form-control" id="exampleFormControlInput2" placeholder="name@example.com" required>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Password</label>
                                <input v-model="ppassword" type="password" class="form-control" id="exampleFormControlInput3" placeholder="Password" required>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Cell phone</label>
                                <input v-model="pcell" type="Name" class="form-control" id="exampleFormControlInput4" placeholder="cell" required>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Gender</label>
                                <select v-model="pgender" class="form-control" id="exampleFormControlSelect5" required>
                                <option >F</option>
                                <option>M</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="gridCheck" required>
                                    <label class="form-check-label" for="gridCheck">
                                        I authorize the use of my data to receive product information
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="gridCheck1" required>
                                    <label class="form-check-label" for="gridCheck">
                                        I accept the terms and conditions
                                    </label>
                                </div>
                            </div>
                            <button v-on:click ="fboton4()" class="btn btn-dark">REGISTER</button>
                        </form> 
                </div>    
            </div>
        </div>
    </div>    

</template>

<script>
    import AuthService from '@/service/Authservice.js'
    export default {
        name: 'registro', 
        data(){
            return{
                ppmail : null,
                ppassword : null,
                pnombre : null,
                pgender: null,
                pcell: null,
                responseData : null,
                E : 0,
            }
        },
        methods:{
            async fboton4(){
                try {
                    const datos = {
                        email: this.ppmail,
                        password: this.ppassword,
                        nombre : this.pnombre,
                        gender: this.pgender,
                        cell_phone: this.pcell,
                    }
                    
                    const response = await AuthService.registro(datos);
                    this.responseData = response;
                    console.log(this.responseData)
                    if(this.responseData.mensaje == "USUARIO YA EXITE"){
                        alert(this.responseData.mensaje);
                    }else{
                        const email = this.responseData.email;
                        const token = this.responseData.token;
                        localStorage.setItem("token", token);
                        localStorage.setItem("email", email);                       
                        alert(this.responseData.mensaje);
                        window.location.href = "/lecturas";
                    }
                } catch (error) {
                    alert(this.responseData.mensaje)
                }       
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
    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
            font-size: 3.5rem;
        }
    }
    .px-3 {
        padding-left: 500px !important;
        padding-right: 500px !important;
    }
    #app {
      width: 100%;
    }
</style>