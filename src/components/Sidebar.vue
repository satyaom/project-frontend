<template>
    <div class="sidebar">
        <div class="title">
            {{user}}
        </div>
        <div class="menu-items">
            <router-link to="/dashboard" active-class="active" tag="button" exact class="side-btn">
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
        </div>
        <button @click="logout">Logout</button>
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
.title {
    color: white;
    font-size: 24px;
    margin-top: 10px;
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
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: transparent;
}

.side-btn:focus {
    outline: none;
}

.side-btn.active {
    position: relative;
    background-color: white;
    color: teal;
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
    background-color: teal;
}
</style>