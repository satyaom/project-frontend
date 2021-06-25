<template>
    
    <div v-for="item in qr" v-bind:key="item"> 
        <img :src="item" alt='not loaded' width="150" height="150"/>
    </div>
</template>

<script>
import {getDataDB} from '../services/store_files'
export default {
    name: "file",    
    data() {    
        return {
            qr : [],
        }    
    },    
    async created() {
        let files = await getDataDB();
        for(let i = 0; i < files.length; i++){
            await this.qr.push(files[i].qrcode);
        }
    }
}
</script>

<style scoped>
.messages { 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 40px;
    color: rgb(167, 167, 167);
    font-weight: 600;
}
</style>