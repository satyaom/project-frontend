<template>
    <div class="overview">
        Overview<br>
    </div>
        <p>TokenID : {{tokenid}}</p><br>
        <p>Public Key : {{pkey}}</p>
</template>

<script>
import router from "../router"    
import axios from "axios"
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
    mounted() {
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    width: 100%;
    font-size: 40px;
    color: rgb(12, 167, 167);
    font-weight: 600;
}
</style>