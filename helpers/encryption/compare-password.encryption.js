const bcrypt = require("bcrypt");


function comparePasswordToHash(password, hash){
    return bcrypt.compare(password, hash);
}



module.exports = comparePasswordToHash;