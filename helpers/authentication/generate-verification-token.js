const crypto = require('crypto');
const models = require("../../db/models");

const generateVerificationToken = (user) => {
    let payload = {
        user_id: user.id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return payload;
};


const saveToken = async (token) => {
    try {
       await models.verifyToken.create(token)
    } catch(error) {
        throw new Error(error);
    }
}



module.exports = {
    saveToken,
    generateVerificationToken
}