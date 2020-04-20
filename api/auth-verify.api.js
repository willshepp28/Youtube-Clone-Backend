const router = require("express").Router();
const models = require("../db/models");


router.get("/:token", async (request, response) => {
    if(!request.params.token) return response.status(400).json({message: "We were unable to find a user for this token."});

    try {
        // Find a matching token
        const token = await models.verifyToken.findOne({ 
            where: {token: request.params.token}
         });

        if (!token) return response.status(400).json({ message: 'We were unable to find a valid token. Your token my have expired.' });



        // If we found a token, find a matching user
        const user = await models.User.findOne({id: token.userId});

        if (!user) return response.status(400).json({ message: 'We were unable to find a user for this token.' });

        if (user.isVerified) return response.status(400).json({ message: 'This user has already been verified.' });

        const updateUser = await models.User.update({
            isVerified: true
        }, {
            where: {
                id: user.id
            }
        });

        return response.status(200).json("The account has been verified. Please log in ")
    
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})

module.exports = router;