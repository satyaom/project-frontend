<template>
    <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
    <div>    
        <h2>Login</h2>    
        <form v-on:submit="login">    
            <input type="text" name="email" id="email"/><br>    
            <input type="password" name="password" id="pass"/><br>    
            <input type="submit" value="Login" />    
        </form>    
    </div>
</template>

<script>
    import router from "../router"    
    import axios from "axios"
    
    export default {    
        name: "Login",    
        methods: {  
            check : function() {
                axios.get('https://cryptyy.herokuapp.com', {withCredentials:true})
                .then((response) => {
                    router.push("/dashboard")
                })
                .catch((errors) => {
                    console.log(errors);
                })
            },
            login: (e) => {    
                e.preventDefault()      
                let login = () => {    
                    let data = {    
                        email: document.getElementById('email').value,    
                        password: document.getElementById('pass').value,    
                    }    
                    axios.post("https://cryptyy.herokuapp.com/login", data, {withCredentials: true})    
                        .then((response) => { 
                            console.log("Logged in")    
                            router.push("/dashboard")    
                        })    
                        .catch((errors) => {    
                            console.log(errors)    
                        })    
                }    
                login()    
            }    
        },
        mounted() {    
            this.check()    
        }    
    }
</script>