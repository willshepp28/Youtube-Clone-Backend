const router = require("express").Router();
const models = require("../db/models");
const _ = require("lodash");
const validateRegisterInputs = require("../helpers/validation/register.validator");

/**
 * REQUIRMENTS
 * 1. User should be able to login
 * 2. Users should be able to register
 */




router.post("/register", async(request, response) => {
   const validateInput = validateRegisterInputs(request.body);


   /*
        1. Validate user input
        2. 
    */
   if(validateInput.error){
       return response.status(400).json(validateInput.error.stack);
   }
   models.User.create(validateInput.value)
    .then((user) => {
       return response.status(200).json(user);
   }).catch((error) =>{ 
       return response.json(error);
   })
})





router.post("/login", (request, response) => {
    const input = request.body;

    return response.status(200).json({
        message: "You are in the login path"
    })
});


module.exports = router;