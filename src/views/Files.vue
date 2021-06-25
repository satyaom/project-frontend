<template>
    <div class="messages">
    <div v-for="item in doc" v-bind:key="item" class="card"> 
        <img :src="item.qrcode" alt='not loaded' width="150" height="150"/>
        <div class="container">
        <h4>FILE ID: {{item.fileid}}</h4>
        <h4>NAME: {{item.name}}</h4>
        <h4>TAMPERED: {{item.tampered}}</h4>
        <h4>FILE TYPE: {{item.filetype}}</h4> 
        </div>
    </div>
    </div>
</template>

<script>
import {getDataDB} from '../services/store_files'
export default {
    name: "file",    
    data() {    
        return {
            doc : [],
        }    
    },    
    async created() {
        let files = await getDataDB();
        for(let i = 0; i < files.length; i++){
            await this.doc.push(files[i]);
        }
    }
}
</script>

<style scoped>
.card {
  margin-top: 16px;
  margin-right: 16px;
  margin-left: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 25%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
    overflow: auto;
  padding: 2px 16px;
}
.messages {
    display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
    text-align: center;
    font-weight: 600;
    height: 900px;
    overflow:auto;
    
}
</style>