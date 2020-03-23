const Joi = require("@hapi/joi");




// Validates the inputs when users register
function validateInputs(input, response){
    const schema  = Joi.object({
        fullName: Joi.string().min(3).required(),
        password: Joi.string().min(6).max(30).required()
    });

    const validateInput = schema.validate(input);

    if(validateInput.error){
        return response.status(400).json(validateInput.error.stack);
    }

    return validateInput;
};



module.exports = validateInputs;