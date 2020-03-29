require('dotenv').config()

const bcrypt = require("bcrypt");
const _ = require("lodash");


async function hashManyPasswords(Users){
   await  _.map(Users, (user) => {
       hashPassword(user.password).then((hash) => {
          user.password = hash;
        })
    });
};

async function hashPassword(password){
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