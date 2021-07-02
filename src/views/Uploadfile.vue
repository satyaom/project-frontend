<template>
          <div class="drag-area" id="upload_area">
    <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
    <input type="file" @change="onFileChange">
    <header>Drag & Drop to Upload File</header>
    <span>OR</span>
    <header>Click Here</header>
  </div>
  <div class="down_log" id="info_area">
        <h3 v-if="selectedFile.name">File Name: {{selectedFile.name}}</h3>
        <h3 v-else>File Name: Select File</h3>
    <button @click="onFileUpload" class="btn">Upload</button><br><br><br>
        <h3 v-if="status">Status: {{status}}</h3>
        <h3 v-else>Status: No File Selected</h3>
  </div>

</template>

<script>
import axios from 'axios';
import {addDataDB} from '../services/store_files'
import {check_login} from "../services/check_login"
import router from '../router/index'
    export default {
        name: 'uploadFile',
        data() {
            return {
                selectedFile:'Select File',
                status:'',
            }
        },
        methods: {
            check_login: function() {    
                axios.get('https://cryptyy.herokuapp.com', {withCredentials:true})
                .then(() => {
                })
                .catch((errors) => {
                    console.log(errors.message);
                    router.push("/login")
                })
            }, 
            onFileChange(event) {
                this.selectedFile = event.target.files[0]
            },
            onFileUpload() {
                check_login()
                this.status='Please wait'
                const formData = new FormData();
                formData.append("postFile", this.selectedFile);
                console.log(this.selectedFile);
                axios.post('https://cryptyy.herokuapp.com/upload', formData, {withCredentials: true})
                .then( async (response)=>{
                    await addDataDB(response)
                    this.status = 'File uploaded'
                    console.log('uploaded')
                })
                .catch((e)=>{
                    console.log(e.message);
                });
            }
        }, 
        created() {
            check_login();
        }
        
    }
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');


.down_log {
  position: relative;
  margin-top: 28%;
  margin-left: center;

  font-size: auto;
  color: grey;
}
.down_log h3 {
  font-size: auto;
}
.drag-area{
  position: absolute;
  margin-left: 27%;
  margin-top: 5%;
  border: 2px dashed #6666ff;
  height: 30%;
  width: 30%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.drag-area input{
  position: absolute;
  height: 100%;
  width: 100%;
  outline: none;
  opacity: 0;
}
.drag-area.active{
  border: 2px solid #6666ff;
}
.drag-area .icon{
  font-size: auto;
  color: #6666ff;
}
.drag-area header{
  font-size: auto;
  font-weight: 500;
  color: #6666ff;
}
.drag-area span{
  font-size: auto;
  font-weight: 500;
  color: #6666ff;
  margin: 10px 0 15px 0;
}
.drag-area label{
  padding: 10px 25px;
  font-size: auto;
  font-weight: 500;
  border: none;
  outline: none;
  background: #6666ff;
  color: whitesmoke;
  border-radius: 5px;
  cursor: pointer;
}
.drag-area img{
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}
.btn:hover, .btn:focus {
  color:black;

  outline: 0;
}

</style>