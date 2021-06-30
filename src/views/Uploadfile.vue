<template>
    <div>
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
import {addDataDB} from '../services/store_files'
import {check_login} from "../services/check_login"
import router from '../router/index'
    export default {
        name: 'uploadFile',
        data() {
            return {
                selectedFile:'',
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