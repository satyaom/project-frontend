<template>
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
        }    
    }
</script>