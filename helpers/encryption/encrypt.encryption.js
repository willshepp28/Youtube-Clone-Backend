require('dotenv').config()

const bcrypt = require("bcrypt");
const _ = require("lodash");



async function hashManyPasswords(Users){
  return Promise.all(
    _.map(Users, async(user) => {
      user.password = await hashPassword(user.password);
   })
  )
};


async function hashPassword(password){
  return Promise.resolve(bcrypt.hash(password, parseInt(process.env.SALT)))
}


async function OldhashManyPasswords(Users){
  await  _.map(Users, (user) => {
      hashPassword(user.password).then((hash) => {
         user.password = hash;
       })
   });
};

async function OldhashPassword(password){
  return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
}

function comparePasswordtoHash(password, hash){
  return  bcrypt.compareSync(password, hash)
}





module.exports = {
  hashManyPasswords,
  hashPassword,
  comparePasswordtoHash
};