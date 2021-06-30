import router from "../router"    
import axios from "axios"
import {deleteDB} from "./store_files"

var check_login= function() {    
    axios.get('https://cryptyy.herokuapp.com', {withCredentials:true})
     .then(async () => {
     })
     .catch((errors) => {
         console.log(errors.message);
         localStorage.clear();
         deleteDB()
         router.push("/login")
     })
 } 

 export {check_login}