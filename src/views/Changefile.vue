<template> 
     <div class="drag-area" id="upload_area">     
    <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
    <input type="file" @change="onFileChange">
    <header>Drag & Drop to Select File</header>
    <span>OR</span>
    <header>Click in this area</header>
    <span style="color: #f88379">(Select file less than 5 MB)</span>
    <span style="color: #f88379; margin-top: 0px">(To tamper select different file)</span>
  </div>
  <div class="down_log" id="info_area">
        <input type="text" name="Number" id="num" class='form__input' placeholder="Enter File Number e.g. 1"><br>
        <h3 v-if="selectedFile.name">File Name: {{selectedFile.name}}</h3>
        <h3 v-else>File Name: Select file from above</h3>
    <button @click="onFileUpload" class="btn" style="padding:0.9rem 2rem">Tamper</button><br><br>
        <h3 v-if="status"><b style="color: #f88379">Status</b>: {{status}}</h3>
        <h3 v-else><b style="color: #f88379">Status</b>: Select file and enter file number</h3>
        <div v-if="state_load">
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
  </div>

</template>

<script>
    import axios from 'axios';
    import {check_login} from "../services/check_login"
    import {doc_st} from './Files.vue';
    let st= {state: false}

    export default {
        name: 'uploadFile',
        data() {
            return {
                selectedFile:'',
                number:'',
                status: '',
                state_load:false,
            }
        },
        methods: {
            onFileChange(event) {
                this.selectedFile = event.target.files[0]
                if(document.getElementById('num').value)
                  this.status = 'Kindly click tamper'
                else
                  this.status = 'Enter file number and click tamper'
            },
            onFileUpload() {
                check_login();
                if(this.selectedFile == '') {
                  this.status = 'Please select file and enter file number'
                }
                else if(document.getElementById('num').value=='') {
                  this.status = 'Enter file number and click tamper'  
                } else if(parseInt(document.getElementById('num').value) > doc_st.length) {
                  if(doc_st.length == 0)
                    this.status = 'Please first verify files';
                  else if(doc_st.length == 1)
                    this.status = 'File number should be 1';
                  else
                    this.status = `File number should between 1 to ${(doc_st.length)}`;
                } else {
                  this.number = document.getElementById('num').value;
                  this.state_load=true;
                  this.status = 'Please Wait'
  
                const formData = new FormData();
                formData.append("postFile", this.selectedFile);
                formData.append("number", this.number);
                console.log(this.selectedFile);
                axios.post('https://cryptyy.herokuapp.com/updateData', formData, {withCredentials: true})
                .then(async ()=>{
                    setTimeout(()=>{
                        st.state = true
                    }, 200);
                    this.status = 'File Tampered'
                    this.state_load = false;
                    console.log('uploaded with no.')
                })
                .catch((e)=>{
                    console.log(e.message);
                });
                }
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
    margin-left: 37%;
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-size: 15px;
  padding: 1% 1%;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  width: 20vw;
  height: 4px;
  display: block;
  border: 0.2rem solid #6666ff;
  transition: all 0.3s;
  font-weight: bold;
}
.down_log {
  position: relative;
  margin-top: 24%;
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
  margin-top: 2%;
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
  font-size: 30px;
  color: #6666ff;
}
.drag-area header{
  font-size: auto;
  font-weight: bold;
  color: #6666ff;
}
.drag-area span{
  font-size: auto;
  font-weight: bold;
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
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: grey;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>