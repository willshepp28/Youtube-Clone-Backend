const Joi = require("@hapi/joi");




// Validates the inputs when users register
function validateChannelInputs(input, response){
    const schema  = Joi.object({
        channel_name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
    });

    return schema.validate(input);
};


module.exports = {
    validateChannelInputs
};