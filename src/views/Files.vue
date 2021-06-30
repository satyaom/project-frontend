<template>
    <div class="messages">
    <div v-if="loading_status">
    <h4 style="margin-left:425px">{{status}}</h4>
         <div class="loader"></div> 
    </div>
    <div v-else v-for="item in doc" v-bind:key="item" class="card"> 
        <img :src="item.qrcode" alt='not loaded' width="150" height="150"/>
        <div class="container">
        <h4>FILE ID: {{item.fileid}}</h4>
        <h4>NAME: {{item.name}}</h4>
        <h4>FILE TYPE: {{item.filetype}}</h4> 
        <a :href="item.file" target="_blank">View File 📩</a><br><br>
        <button class="button" @click="deleteDoc(item.fileid)">Delete</button> 🗑️
        <h4 v-if="item.tampered">❌</h4>
        <h4 v-else>✅</h4>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import {putDataDB, getDataDB, isPutData, deleteFile} from '../services/store_files'
import {st} from '../views/Changefile.vue';
import {check_login} from "../services/check_login"

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
    async deleteDoc (fileid) {
      this.loading_status = true;
      this.status = 'Deleting File';
      var body={
        fileId: fileid
      }
      await axios.post('https://cryptyy.herokuapp.com/deleteFile', body, {withCredentials:true})
      .then((response)=>{
        console.log(response.data.message);
      })
      .catch((e)=>{
        console.log(e.message);
      });
      await deleteFile(fileid);
      this.status = 'Fetching File';
      this.doc.length = 0;
      let files = await getDataDB()
      for(let i = 0; i < files.length; i++){
          let doc_base64 = this.arrayBufferToBase64(files[i].file)
          let str_file = "data:"+files[i].filetype+";base64,"+doc_base64;
          files[i].file = str_file
          await this.doc.push(files[i]);
      }
      this.loading_status = false
      this.status = ''
    },
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
        check_login();

        if(st.state) {
            this.status = 'Verifying Files'
            this.loading_status = true
            await putDataDB()
            st.state = false
        }
        if(isPutData()) {
            this.status = 'Verifying Files'
            await putDataDB()
        } 
        // this.status = 'Fetching Files'
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
.button {
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  border-radius: 0.6em;
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 200px;
  height: 200px;
  animation: spin 2s linear infinite;
  margin-left: 450px;
  margin-top: 300px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.card {
  margin-top: 14px;
  margin-right: 14px;
  margin-left: 14px;
  margin-bottom: 14px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  overflow: auto;
  width: 20vw;
  height: 510px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  
  padding: 2px 16px;
  overflow-wrap: break-word;
}
.messages {
    margin-top: 2%;
    margin-left: 10%;
    display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
    text-align: center;
    font-weight: 600;
    height: 95vh;
    overflow:auto;
}
</style>