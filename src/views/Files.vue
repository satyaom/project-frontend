<template>
    <div class="messages">
    <div v-if="loading_status">
    <h4 style="margin-left:650px">{{status}}</h4>
         <div class="loader"></div> 
    </div>
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
import {putDataDB, getDataDB} from '../services/store_files'
import {st} from '../views/Changefile.vue';

export default {
    name: "file",
    data() {    
        return {
            loading_status: true,
            doc : [],
            status: ''
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
        if(st.state) {
            this.status = 'Verifying Files'
            this.loading_status = true
            await putDataDB()

        }
        st.state = false
        this.status = 'Fetching Files'
        let files = await getDataDB();
        for(let i = 0; i < files.length; i++){
            let doc_base64 = this.arrayBufferToBase64(files[i].file)
            let str_file = "data:"+files[i].filetype+";base64,"+doc_base64;
            files[i].file = str_file
            await this.doc.push(files[i]);
        }
        this.status = ''
        this.loading_status = false;
        
    }
}
</script>

<style scoped>

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 200px;
  height: 200px;
  animation: spin 2s linear infinite;
  margin-left: 650px;
  margin-top: 300px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.card {
  margin-top: 16px;
  margin-right: 16px;
  margin-left: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 25%;
  height: 50%;
  overflow: auto;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
    
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