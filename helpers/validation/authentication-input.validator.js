const Joi = require("@hapi/joi");




// Validates the inputs when users register
function validateInputs(input, response){
    const schema  = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().min(3).email().required(),
        password: Joi.string().min(6).max(30).required()
    });

    return schema.validate(input);
};



module.exports = validateInputs;