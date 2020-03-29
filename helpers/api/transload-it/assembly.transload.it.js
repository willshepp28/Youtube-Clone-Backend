require("dotenv").config();

const Transloadit = require('transloadit')
const transloaditOptions = require("./options.transloadit");


const transloadit = new Transloadit({
  authKey: process.env.TRANSLOAD_IT_AUTH_KEY,
  authSecret: process.env.TRANSLOAD_IT_SECRET_KEY
});


const progressCb = (ret) => {
    let msg = ''
    if (ret.uploadProgress) {
      msg += `♻️ Upload progress polled: ` + ret.uploadProgress.uploadedBytes + ` of ` + ret.uploadProgress.totalBytes + ` bytes uploaded.`
    }
    if (ret.assemblyProgress) {
      msg += `♻️ Assembly progress polled: ${ ret.assemblyProgress.error ? ret.assemblyProgress.error : ret.assemblyProgress.ok } ret.assemblyProgress.assembly_id ... `
    }
   
    console.log(msg)
  }

// Dynamically picks options, then creates assembly
async function createAssembly(video_url, chooseOptions){
    return new Promise((resolve, reject) => {
     return transloadit.createAssembly(transloaditOptions[chooseOptions](video_url), (err, result) => {
       if (err) {
         return reject(err);
       }
     
      return resolve(result.results);
     }, progressCb);
    })
 }


module.exports = {
    createAssembly
};