<template>
    <div class="sidebar">
        <div class="title">
            {{user}}
        </div>
        <div class="menu-items">
            <router-link to="/overview" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Overview
                </div>
            </router-link>
            <router-link to="/files" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Files
                </div>
            </router-link>
            <router-link to="/uploadFile" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Upload File
                </div>
            </router-link>
            <router-link to="/changeFile" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Change File
                </div>
            </router-link>
        <button @click="logout" class="btn first">Logout</button>
        </div>
    </div>
</template>

<script>
import router from "../router"    
import axios from "axios"
import { deleteDB } from '../services/store_files'

export default {
    name: "Dashboard",    
    data() {    
        return {    
            user :''
        }    
    },    
    methods: {    
        check: function() {    
            axios.get('https://cryptyy.herokuapp.com', {withCredentials:true})
            .then((response) => {
                    this.user = response.data.firstname
            })
            .catch((errors) => {
                console.log(errors.message);
                router.push("/login")
            })
        },
        logout : function() {
            axios.get('https://cryptyy.herokuapp.com/logout', {withCredentials:true})
            .then((response) => {
                console.log(response.data.message);
                localStorage.clear();
                deleteDB()
                router.push('/')
            })
            .catch((errors) => {
                console.log(errors.message);
                router.push("/login")
            })
        }    
    },    
    created() {    
        this.check()    
    }    
}
</script>

<style scoped>

.btn {
  box-sizing: border-box;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background-color: transparent;
  border: 2px solid whitesmoke;
  border-radius: 0.6em;
  color: #ffffff;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
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
  color: #fff;
  outline: 0;
}

.first {
  -webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
}
.first:hover {
  box-shadow: 0 0 40px 40px #b2b2ff inset;
}

.title {
    font-weight: bold;
    color: white;
    font-size: 40px;
    margin-top: 60px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 6px;
}

.menu-items > * {
    margin-top: 60px;
}

.side-btn {
    border: none;
    padding: 16px 0px;
    cursor: pointer;
    font-size: 17px;
    font-weight: bold;
    color: white;
    background-color: transparent;
}

.side-btn:focus {
    outline: none;
}

.side-btn.active {
    position: relative;
    background-color: white;
    color:#6666ff;
    font-weight: 600;
    margin-left: 10px;
    border-radius: 30px 0 0 30px;
}

.side-btn.active::before {
    top: -30px;
}

.side-btn.active::after {
    bottom: -30px;
}

.side-btn.active::before, .side-btn.active::after {
    position: absolute;
    content: "";
    right: 0;
    height: 30px;
    width: 30px;
    background-color: white;
}

.side-btn.active .link-container::before {
    top: -60px;
}

.side-btn.active .link-container::after {
    bottom: -60px;
    z-index: 99;
}

.side-btn.active .link-container::before, .side-btn.active .link-container::after {
    position: absolute;
    content: "";
    right: 0px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color:#6666ff;
}
</style>