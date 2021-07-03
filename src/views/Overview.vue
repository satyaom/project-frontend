<template>
        <div class="overview">
        <p><b style="color:#f88379">TokenID</b> : {{tokenid}}</p><br>
        <p><b style="color:#f88379">Public Key</b> : <br><br>{{pkey}}</p>
        </div>
</template>

<script>
import router from "../router"    
import axios from "axios"
import {check_login} from "../services/check_login"

export default {
    name: "overview",    
    data() {    
        return {    
            tokenid : '',
            pkey : '',
        }    
    },    
    methods: {   
        check: async function() {    
            await axios.get('https://cryptyy.herokuapp.com/overview', {withCredentials:true})
            .then((response) => {
                    this.tokenid = response.data.token_id
                    this.pkey = response.data.public_key
                    localStorage.tokenid = response.data.token_id
                    localStorage.pkey = response.data.public_key
            })
            .catch((errors) => {
                console.log(errors.message);
                router.push("/login")
            })
        }    
    },    
    created() {
        check_login();
        if(localStorage.tokenid) {
            this.tokenid = localStorage.tokenid
            this.pkey = localStorage.pkey
        } else {
            this.check()    
        }
    }
}
</script>

<style scoped>
.overview {
    margin-top: 10%;
    margin-left: 15%;
    font-size: 20px;
    text-align: left;
    width: 70%;
    overflow-wrap: break-word;
    color: #5072A7;
    font-weight:bold;
}
</style>