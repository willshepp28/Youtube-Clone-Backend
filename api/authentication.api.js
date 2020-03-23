const router = require("express").Router();
const models = require("../db/models");
const _ = require("lodash");
const validateInputs = require("../helpers/validation/authentication-input.validator");

/**
 * REQUIRMENTS
 * 1. User should be able to login
 * 2. Users should be able to register
 */




router.post("/register", async(request, response) => {
  const inputs = validateInputs(request.body, response);

   models.User.create(inputs.value)
    .then((user) => {
       return response.status(200).json({message: "User succesfully created"});
   }).catch((error) =>{ 
       return response.json(error);
   })
});





router.post("/login", (request, response) => {
    const inputs = validateInputs(request.body, response);

    return response.status(200).json({
        message: "You are in the login path"
    })
});


module.exports = router;