<template>
    <div class="line_top">
    <button @click="homePage" class="btn_up">Home</button>
    </div>
    <div class="login_grp">    
        <h2>SIGN UP</h2><br>    
        <form v-on:submit="signup">    
            <input type="Name" name="name" class="form__input" placeholder="Name" id="name"><br><br>    
            <input type="text" name="email" class="form__input" placeholder="Email" id="email"/><br><br>    
            <input type="password" name="password" class="form__input" placeholder="Password" id="pass"/><br><br>
            <input type="submit" value="Register" class="btn"/>    
        </form>    
    </div>
    <h3 v-if="status"><b style="color: #5072A7; font-size: 15px">{{status}}</b></h3>
    <div v-else class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</template>

<script>
    import router from "../router"    
    import axios from "axios"

    export default {    
        name: "Signup",
        data() {
            return {
                status : ' ',
            }
        },    
        methods: {
            homePage() {
                router.push('/')
            },  
            signup(e) {    
                e.preventDefault()      
                let login = () => {   
                    this.status = ''; 
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
                            console.log(errors.message)
                            this.status = errors.response.data.message ?errors.response.data.message:
                                                                    'Email: '+errors.response.data.errors[0].msg;  
                        })    
                }
                if(document.getElementById('email').value == '' && document.getElementById('pass').value == ''&& document.getElementById('name').value == '')
                    this.status = 'Name, email and password field are empty';
                else if(document.getElementById('email').value == '')
                    this.status = 'Email Field is empty';
                else if(document.getElementById('pass').value == '')
                    this.status = 'Password field is empty'
                else if(document.getElementById('name').value == '')
                    this.status = 'Name field is empty'
                else    
                    login()    
            }    
        } 
    }
</script>
<style scoped>
.login_grp {
    border-radius: 20px;
    margin-left: 32%;
    margin-top: 8vh;
    padding-bottom: 40px;
    padding-left: 60px;
    padding-right: 60px;
    width: 28vw;
    align-items: center;
    color:#5072A7;
    padding-top: 10px;
    background-image: url("../assets/pricing-illustration.svg");
    background-repeat: no-repeat;
}
.form__input {
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-size: 1.2rem;
	margin: 0 auto;
  padding: 1rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 20vw;
  height: 4px;
  display: block;
  border: 0.1rem solid #5072A7;
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
  color:#5072A7;
  cursor: pointer;
 
  -webkit-align-self: center;
      -ms-flex-item-align: center;
          align-self: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  margin: 20px;
  padding: 1em 2.8em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
.btn_up {
  box-sizing: border-box;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background-color: transparent;
  border: 2px solid;
  border-radius: 0.6em;
  color: #6666ff;
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
.btn_up:hover, .btn:focus {
  color:black;

  outline: 0;
}
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: grey;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>