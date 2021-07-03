<template>
    <div class="messages">
    <div v-if="loading_status">
    <h3 style="margin-left:480px; color: grey">{{status}}</h3>
         <div class="loader"></div> 
    </div>
    <div v-else-if="doc.length == 0" class="no_upload">
      <h2>Kindly Upload Some Files</h2>
    </div>
    <div v-else v-for="(item, index) in doc" v-bind:key="item">
        <div v-if="!item.tampered" class="card"> 
          <p><b style="color: teal">FILE NUMBER</b>: {{index+1}}</p>
          <img :src="item.qrcode" alt='not loaded' width="125" height="125"/>
          <div class="container">
          <p><b style="color: teal">FILE ID</b>: {{item.fileid}}</p>
          <p><b style="color: teal">NAME</b>: {{item.name}}</p>
          <p><b style="color: teal">FILE TYPE</b>: {{item.filetype}}</p>
          <a :href="item.file" target="filename" style="color: #6666ff">View File 📩</a><br><br>
          <button class="button" @click="deleteDoc(item.fileid)">Delete</button> 🗑️
          <p>File Verified ✅</p>
          </div>
        </div>
        <div v-else class="red_card">
          <p><b>FILE NUMBER</b>: {{index+1}}</p>
          <img :src="item.qrcode" alt='not loaded' width="125" height="125"/>
          <div class="container">
          <p><b style="color: #FF6347">FILE ID</b>: {{item.fileid}}</p>
          <p><b style="color: #FF6347">NAME</b>: {{item.name}}</p>
          <p><b style="color: #FF6347">FILE TYPE</b>: {{item.filetype}}</p>
          <a :href="item.file" target="filename" style="color: #6666ff">View File 📩</a><br><br>
          <button class="button" @click="deleteDoc(item.fileid)">Delete</button> 🗑️
          <p>File Tampered ❌</p>
        </div>
        </div>    
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import {putDataDB, getDataDB, isPutData, deleteFile} from '../services/store_files'
import {st} from '../views/Changefile.vue';
import {check_login} from "../services/check_login"
var doc_st = {
  length: 0
}
export default {
    name: "file",
    data() {    
        return {
            loading_status: true,
            doc : [],
            status: '',
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
      doc_st.length = this.doc.length;
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
        doc_st.length = this.doc.length;
    }
}
export {doc_st};

</script>

<style scoped>
.no_upload {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 30px;
    color: rgb(167, 167, 167);
    font-weight: 600;
}
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
  border-top: 16px solid #5072A7; /* Blue */
  border-radius: 100%;
  width: 150px;
  height: 150px;
  animation: spin 2s linear infinite;
  margin-left: 500px;
  margin-top: 300px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.card {
  border-radius: 20px;
  padding-top: 0px;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
  transition: 0.3s;
  overflow: auto;
  width: 22vw;
  height: 500px;
}

.red_card {
  border-radius: 20px;
  padding-top: 0px;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
  transition: 0.3s;
  overflow: auto;
  width: 22vw;
  height: 510px;
  background-color: #fbceb1;
}

.red_card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.6);
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.6);
}

.container {
  padding: 0px 16px;
  overflow-wrap: break-word;
}
.messages {
    margin-top: 2%;
    margin-left: 8%;
    display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
    text-align: center;
    font-weight: 600;
    height: 95vh;
    overflow:auto;
}
</style>