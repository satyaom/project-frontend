<template>
  <div id="app">
    <form @submit.prevent="login">
      <input v-model="email" placeholder="email">
      <input v-model="password" placeholder="password" type="password">
      <input type="submit" value="log in">
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const { email, password } = this;
      const res = await fetch(
        "https://cryptyy.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      );
      const data = await res.json();
      console.log(data);
    }
  }
};
</script>