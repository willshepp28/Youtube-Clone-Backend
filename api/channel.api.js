const router = require("express").Router();
const {validateToken} = require("../helpers/authentication/validate-token");
const models = require("../db/models");
const { validateChannelInputs } = require("../helpers/validation/channel-input.validator");

router.post("/createChannel", validateToken, (request, response) => {

    const inputs = validateChannelInputs(request.body.value);

    if(inputs.error){
        return response.status(400).json(inputs.error.stack);
    }

    models.Channel.create({
        user_id: request.decoded.id,
        name: inputs.value.channel_name,
        description: inputs.value.description
    })
    .then((user) => {
       return response.status(200).json({message: "User succesfully created"});
   }).catch((error) =>{ 
       return response.statu(400).json(error.message)
   })
});

module.exports = router;