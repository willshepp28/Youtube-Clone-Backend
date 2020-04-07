require("dotenv").config()
const bycrpt = require("bcrypt");



 async function hashPassword(password){
    return await bycrpt.hash(password, parseInt(process.env.SALT))
}


// async function hashPassword(password){
//     return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
//   }
  
module.exports = hashPassword;