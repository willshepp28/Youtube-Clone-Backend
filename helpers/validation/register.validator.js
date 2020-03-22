const Joi = require("@hapi/joi");




// Validates the inputs when users register
function validateRegiseterInputs(input){
    const schema  = Joi.object({
        fullName: Joi.string().min(3).required(),
        password: Joi.string().min(6).max(30).required()
    });

    return schema.validate(input);
};



module.exports = validateRegiseterInputs;