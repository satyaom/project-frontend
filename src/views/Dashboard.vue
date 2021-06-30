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
import {deleteDB} from "../services/store_files"
import Sidebar from '../components/Sidebar'
// import {putDataDB} from '../services/store_files'
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
                    // await putDataDB();
                    
                })
                .catch((errors) => {
                    console.log(errors.message);
                    localStorage.clear();
                    deleteDB()
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
    background-color: #6666ff;
    height: 100vh;
    width: 100%;
    text-align: center;
}

.content {
    background-color: white;
}
</style>