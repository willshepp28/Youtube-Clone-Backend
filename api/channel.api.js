const router = require("express").Router();
const {validateToken} = require("../helpers/authentication/validate-token");
const models = require("../db/models");
const { validateChannelInputs } = require("../helpers/validation/channel-input.validator");
const sequelize = models.sequelize;

router.post("/createChannel", validateToken, async (request, response) => {

    const inputs = validateChannelInputs(request.body.value);
    let transaction = await sequelize.transaction();

    if(inputs.error){
        return response.status(400).json(inputs.error.stack);
    }


    try {

        const createChannel = await models.Channel.create({
            user_id: request.decoded.id,
            name: inputs.value.channel_name,
            description: inputs.value.description
        }, {transaction: transaction});
    
        if(!request.body.has_channel) { 
            const modifyUserHasChannelProperty = await models.User.update(
                {has_channel: true},
                {where: {id: request.decoded.id},
                 transaction: transaction }
            ).then(async() => {
                await transaction.commit();
                return response.status(200).json("Users first channel was created")
            })
        } else {
            await transaction.commit();
            return response.status(200).json("Channel successfully created")
        }

        

    } catch(error) {
        await transaction.rollback();
        return response.status(400).json(error.message)
    }

  
});


module.exports = router;