<template>
    <div class="line_top">
    <button @click="homePage" class="btn">Home</button>
    </div>
    <div class="login_grp">    
        <h2>SIGN UP</h2><br>    
        <form v-on:submit="signup">    
            <input type="Name" name="name" class="form__input" placeholder="Name" id="name"><br><br>    
            <input type="text" name="email" class="form__input" placeholder="Email" id="email"/><br><br>    
            <input type="text" name="password" class="form__input" placeholder="Password" id="pass"/><br><br>
            <input type="submit" value="Register" class="btn"/>    
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
                        .then(async () => { 
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
<style scoped>

.login_grp {
    border-radius: 20px;
    margin-left: 35%;
    margin-top: 12vh;
    padding-bottom: 10px;
    width: 28vw;
    align-items: center;
    color:white;
    padding-top: 10px;
    background-color: #63a4ff;
    background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);

}
.form__input {
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-size: 1.2rem;
	margin: 0 auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 20vw;
  height: 4px;
  display: block;
  border-bottom: 0.3rem solid transparent;
  transition: all 0.3s;
}

.btn {
  box-sizing: border-box;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background-color: transparent;
  border: 2px solid;
  border-radius: 0.6em;
  color: #4d4dff;
  cursor: pointer;
 
  -webkit-align-self: center;
      -ms-flex-item-align: center;
          align-self: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  margin: 20px;
  padding: 1.2em 2.8em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
.btn:hover, .btn:focus {
  color:black;

  outline: 0;
}
</style>