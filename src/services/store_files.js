import db from './DB';
import axios from "axios"

var filename_list = []

var putDataDB = async()=>{
  await db.open()
  filename_list.length = 0;
  await axios.get('https://cryptyy.herokuapp.com/getUploads', {withCredentials: true})
  .then(async (response) => {
    let obj = response.data
    let tamperlist = obj.tampered
    let array =  obj.fileinfo
    array.forEach(async (element, index) => {
      filename_list.push(element.fileName);
      await db.upload.put({ 
        fileid: element.fileName, 
        qrcode: element.qr.data,
        tampered: tamperlist[index],
        name: element.postFile.name,
        file: element.postFile.data.data,
        filetype: element.postFile.contentType
      }).then(()=>{
        console.log('done');
      }).catch((e)=>{
        console.log(e.message)
      });
    });
  })
}

var addDataDB = async(post) =>{
  await db.open()
  let obj = post.data
  let tamper = obj.tampered
  let element =  obj.fileinfo
  filename_list.push(element.fileName);
  await db.upload.put({ 
    fileid: element.fileName, 
    qrcode: element.qr.data,
    tampered: tamper,
    name: element.postFile.name,
    file: element.postFile.data.data,
    filetype: element.postFile.contentType
  }).then(()=>{
    console.log('document fetched');
  }).catch((e)=>{
    console.log(e.message)
  });
}

var isPutData = ()=> {
  if(filename_list.length == 0) {
    return true;
  }
  return false;
}

var getDataDB = async () => {
  let file_list = []
  for(let i = 0; i < filename_list.length; i++) {
    let doc = await db.upload.get(filename_list[i]);
    await file_list.push(doc);
  }
  // return file_list;
  return file_list;
}

var deleteFile=async(fileid) => {
  await db.upload.delete(fileid)
  .then(()=>{
    var index = filename_list.indexOf(fileid);
    if (index !== -1) {
      filename_list.splice(index, 1);
    }
    console.log('file deleted');
  }).catch((e)=>{
    console.log(e.message);
  });
}

var deleteDB= async ()=> {
  filename_list.length = 0
  await db.upload.clear().then(()=>{
    console.log('table cleared');
  })
  .catch(e=>{
    console.log(e.message);
  });
} 



export {deleteDB, putDataDB, getDataDB, addDataDB, isPutData, deleteFile};