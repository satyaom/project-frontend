<template>
    <div>
        <h2>Upload Image</h2>
        <div> 
            <input type="file" @change="onFileChange"/> 
            <button @click="onFileUpload"> 
              Upload! 
            </button> 
        </div>
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
            }
        },
        methods: {
            onFileChange(event) {
                this.selectedFile = event.target.files[0]
            },
            onFileUpload() {
                const formData = new FormData();
                formData.append("postFile", this.selectedFile);
                console.log(this.selectedFile);
                axios.post('https://cryptyy.herokuapp.com/upload', formData, {withCredentials: true})
                .then(async ()=>{
                    await putDataDB();
                    console.log('uploaded')
                })
                .catch((e)=>{
                    console.log(e.message);
                });
            }
        }
        
    }
</script>

<style scoped>
.profile {
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