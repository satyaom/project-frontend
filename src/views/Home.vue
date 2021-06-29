<template>
  <button @click="loginPage" class="btn">Login</button>
  <button @click="signupPage" class="btn">Sign Up</button><br>
  <img src="../assets/backimg.jpg" height="900" width="1300" alt="background image">

</template>

<script>
// @ is an alias to /src
import router from '../router/index';
export default {
  name: 'Home',
  methods:{
    loginPage() {
      router.push('/login');
    },
    signupPage() {
      router.push('/signup');
    }
  }
}
</script>
<style>
.btn {
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
  color: #1919ff;

  outline: 0;
}

</style>
