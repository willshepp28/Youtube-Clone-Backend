require("dotenv").config()
const bycrpt = require("bcrypt");



 async function hashPassword(password){
    return await bycrpt.hash(password, parseInt(process.env.SALT))
}



module.exports = hashPassword;