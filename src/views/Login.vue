<template>
    <button @click="homePage">Home</button>
    <div>    
        <h2>Login</h2>    
        <form v-on:submit="login">    
            Email: <input type="text" name="email" id="email"/><br><br>    
            Password: <input type="password" name="password" id="pass"/><br><br>    
            <input type="submit" value="Login" />    
        </form>    
    </div>
    <br>
    <button @click="signupPage">Register</button>
</template>

<script>
    import router from "../router"    
    import axios from "axios"
    import {putDataDB} from '../services/store_files'
    export default {    
        name: "Login",    
        methods: {
            homePage() {
                router.push('/')
            },
            signupPage() {
                router.push('/signup');
            },  
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
                        .then(async (response) => { 
                            console.log("Logged in")
                            putDataDB()    
                            router.push("/dashboard")    
                        })    
                        .catch((errors) => {    
                            console.log(errors.message)    
                        })    
                }    
                login()    
            }    
        },
        created() {    
            this.check()    
        }    
    }
</script>