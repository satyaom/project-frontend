<template>
    <button @click="homePage">Home</button>
    <div>    
        <h2>Sign Up</h2>    
        <form v-on:submit="signup">    
            Name: <input type="Name" name="name" id="name"/><br><br>    
            Email: <input type="text" name="email" id="email"/><br><br>    
            Password: <input type="password" name="password" id="pass"/><br><br>
            <input type="submit" value="Register" />    
        </form>    
    </div>
</template>

<script>
    import router from "../router"    
    import axios from "axios"

    export default {    
        name: "Signup",    
        methods: {
            homePage() {
                router.push('/')
            },  
            signup: (e) => {    
                e.preventDefault()      
                let login = () => {    
                    let data = {
                        name: document.getElementById('name').value,    
                        email: document.getElementById('email').value,    
                        password: document.getElementById('pass').value,    
                    }    
                    axios.post("https://cryptyy.herokuapp.com/signup", data, {withCredentials: true})    
                        .then(async (response) => { 
                            console.log("signed up")    
                            router.push("/login")    
                        })    
                        .catch((errors) => {    
                            console.log(errors.data.message)    
                        })    
                }    
                login()    
            }    
        } 
    }
</script>