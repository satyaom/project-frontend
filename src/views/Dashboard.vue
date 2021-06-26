<template>
    <div class="dashboard">
        <Sidebar/>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import router from "../router"    
import axios from "axios"

import Sidebar from '../components/Sidebar'
import {putDataDB} from '../services/store_files'
export default {
    name: 'home',

    components: {
        Sidebar
    },
    methods: {    
            check: function() {    
               axios.get('https://cryptyy.herokuapp.com', {withCredentials:true})
                .then(async (response) => {
                    console.log(response.data.firstname);
                    await putDataDB();
                })
                .catch((errors) => {
                    console.log(errors.message);
                    router.push("/login")
                })
            }    
        },    
        mounted() {    
            this.check()    
        }
}
</script>

<style>
.dashboard {
    display: grid;
    grid-template-columns: 1fr 5fr;
    background-color: teal;
    height: 100vh;
    width: 100vw;
}

.content {
    background-color: white;
    border-radius: 10px;
    margin: 6px 6px 6px 0px;
}
</style>