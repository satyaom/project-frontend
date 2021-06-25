<template>
    <div class="messages">
    <div v-for="item in doc" v-bind:key="item" class="card"> 
        <img :src="item.qrcode" alt='not loaded' width="150" height="150"/>
        <div class="container">
        <h4>FILE ID: {{item.fileid}}</h4>
        <h4>NAME: {{item.name}}</h4>
        <h4>TAMPERED: {{item.tampered}}</h4>
        <h4>FILE TYPE: {{item.filetype}}</h4> 
        <a :href="item.file" target="_blank">View File 📩</a>
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
    methods : {
    fileLink(file) {
        window.open(`${file}`);
    },    
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
        }
    }, 
    async created() {
        let files = await getDataDB();
        for(let i = 0; i < files.length; i++){
            let doc_base64 = this.arrayBufferToBase64(files[i].file)
            let str_file = "data:"+files[i].filetype+";base64,"+doc_base64;
            files[i].file = str_file
            await this.doc.push(files[i]);
        }
        console.log(files[0].file)
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