const bcrypt = require("bcrypt");


async function comparePasswordToHash(password, hash){
    return await bcrypt.compare(password, hash);
}



module.exports = comparePasswordToHash;