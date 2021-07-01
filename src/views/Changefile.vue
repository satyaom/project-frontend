<template> 
        <input type="text" name="Number" id="num" class='form__input' placeholder="Enter File Number">
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
    <button @click="onFileUpload" class="btn">Upload</button>
        <h3 v-if="status">Status: {{status}}</h3>
        <h3 v-else>Status: No File Selected</h3>
  </div>

</template>

<script>
    import axios from 'axios';
    import {check_login} from "../services/check_login"
    let st= {state: false}

    export default {
        name: 'uploadFile',
        data() {
            return {
                selectedFile:'',
                number:'',
                status: ''
            }
        },
        methods: {
            onFileChange(event) {
                this.selectedFile = event.target.files[0]
            },
            onFileUpload() {
                this.status = 'Please Wait'
                this.number = document.getElementById('num').value;
                const formData = new FormData();
                formData.append("postFile", this.selectedFile);
                formData.append("number", this.number);
                console.log(this.selectedFile);
                axios.post('https://cryptyy.herokuapp.com/updateData', formData, {withCredentials: true})
                .then(async ()=>{
                    setTimeout(()=>{
                        st.state = true
                    }, 100);
                    this.status = 'File Uploaded'
                    console.log('uploaded with no.')
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
    export{st}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

.form__input {
    margin-left: 36%;
    margin-top: 2%;
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-size: 1.2rem;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  width: 20vw;
  height: 4px;
  display: block;
  border: 0.1rem solid #6666ff;
  transition: all 0.3s;
}
.down_log {
  position: relative;
  margin-top: 35%;
  margin-left: 23%;
  margin-right: 24%;
  color: grey;
}
.drag-area{
  position: absolute;
  margin-left: 23%;
  margin-top: 2%;
  border: 2px dashed #6666ff;
  height: 500px;
  width: 700px;
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
  font-size: 100px;
  color: #6666ff;
}
.drag-area header{
  font-size: 30px;
  font-weight: 500;
  color: #6666ff;
}
.drag-area span{
  font-size: 25px;
  font-weight: 500;
  color: #6666ff;
  margin: 10px 0 15px 0;
}
.drag-area label{
  padding: 10px 25px;
  font-size: 20px;
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