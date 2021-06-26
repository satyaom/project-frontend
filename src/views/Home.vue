<template>
  <button @click="loginPage">Login</button>
  <button @click="signupPage">Sign Up</button>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import router from '../router/index';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
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
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
