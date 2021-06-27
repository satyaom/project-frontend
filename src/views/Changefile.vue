<template>
     <div>
        <h2>Number</h2> 
        <input type="text" name="Number" id="num">
        <h2>Upload Image</h2>
        <div> 
            <input type="file" @change="onFileChange"/> 
            <button @click="onFileUpload"> 
              Upload! 
            </button> 
        </div>
      <h4>{{status}}</h4>  
      </div>
</template>

<script>
    import axios from 'axios';
    import {putDataDB} from '../services/store_files'

    export default {
        name: 'uploadFile',
        data() {
            return {
                selectedFile:'',
                number:'',
                status: '',
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
                    this.status = 'Fetching and verifying the data'
                    await putDataDB();
                    this.status = 'File Uploaded'
                    console.log('uploaded with no.')
                })
                .catch((e)=>{
                    console.log(e.message);
                });
            }
        }
        
    }
</script>

<style scoped>
.settings {
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