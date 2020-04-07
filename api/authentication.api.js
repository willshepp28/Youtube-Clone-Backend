const router = require("express").Router();
const models = require("../db/models");
const _ = require("lodash");
const {
    validateRegisterInputs,
    validateLoginInputs
} = require("../helpers/validation/authentication-input.validator");
const comparePasswordToHash = require("../helpers/encryption/compare-password.encryption");
const jwt = require("jsonwebtoken");
const fs = require("fs");


/**
 * REQUIRMENTS
 * 1. User should be able to login
 * 2. Users should be able to register
 */



router.post("/register", async(request, response) => {
  const inputs = validateRegisterInputs(request.body, response);


  if(inputs.error){
    return response.status(400).json(inputs.error.stack);
}

inputs.value.fullName = inputs.value.firstName + " " + inputs.value.lastName;


   models.User.create(inputs.value)
    .then((user) => {
       return response.status(200).json({message: "User succesfully created"});
   }).catch((error) =>{ 
       return response.statu(400).json(error.message)
   })
});





router.post("/login", (request, response) => {
    const inputs = validateLoginInputs(request.body, response);

    if(inputs.error){
        return response.status(400).json(inputs.error.stack);
    }

   models.User.findOne({
       where: { email: inputs.value.email}
   })
   .then(async (user) => {

    // if user not found send back 404
    if (!user) {
        return response.status(404).json({ message: "User not Found." });
    };

    const passwordValid = await comparePasswordToHash(inputs.value.password, user.dataValues.password)

    // check if password matches hash, if not send back 400
    if(!passwordValid){
        return response.status(400).json({message: "Password is invalid."})
    }

    const token = jwt.sign({id: user.dataValues.id}, fs.readFileSync("./eprivate.key", "utf-8"), {
        algorithm: 'RS256',
        expiresIn: 86400
    })
    return response.status(200).json({
        id: user.dataValues.id,
        fullName: user.dataValues.fullName,
        hasChannel: user.dataValues.has_channel,
        token: token
    });
    
   })
   .catch(error => {
       return response.status(400).json(error);
   })
});






module.exports = router;