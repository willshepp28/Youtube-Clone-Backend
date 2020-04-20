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
const {generateVerificationToken, saveToken} = require("../helpers/authentication/generate-verification-token")


/**
 * REQUIRMENTS
 * 1. User should be able to login
 * 2. Users should be able to register
 */


async function sendVerificationEmail(user, request, response){
    try{
        const token = await generateVerificationToken(user);
        await saveToken(token);

        // Save the verification token

        let subject = "Account Verification Token";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link="http://"+request.headers.host+"/api/auth/verify/"+token.token;
        let html = `<p>Hi ${user.fullName}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;

        await sendEmail({to, from, subject, html});

        response.status(200).json({message: 'A verification email has been sent to ' + user.email + '.'});
    }catch (error) {
        response.status(500).json({message: error.message})
    }
}



router.post("/register-v2", async(request, response) => {
  const inputs = validateRegisterInputs(request.body, response);


  if(inputs.error){
    return response.status(400).json(inputs.error.stack);
}

inputs.value.fullName = inputs.value.firstName + " " + inputs.value.lastName;


   models.User.create(inputs.value)
    .then((user) => {
       return response.status(200).json({message: "User successfully created"});
   }).catch((error) =>{ 
       return response.status(400).json(error.message)
   })
});




router.post("/register", async(request, response) => {
    const inputs = validateRegisterInputs(request.body, response);

    if(inputs.error) { return response.status(400).json(inputs.error.stack)};

    inputs.value.fullName = inputs.value.firstName + " " + inputs.value.lastName;

    try {
        const user = await models.User.findOne({
            where: {
                email: inputs.value.email
            }
        });

        if(user){ return response.status(401).json({message: "User already created"})}
        var newUser = await models.User.create(inputs.value);

        await sendVerificationEmail(newUser, request, response)
        // const newUser = await models.User.create(inputs.value);

        

    } catch (error) {
        response.status(500).json({success: false, message: error.message})
    }
})







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
        profile_pic: user.dataValues.profile_pic,
        hasChannel: user.dataValues.has_channel,
        token: token
    });
    
   })
   .catch(error => {
       return response.status(400).json(error);
   })
});






module.exports = router;