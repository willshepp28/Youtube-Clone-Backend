
const router = require("express").Router();
const models = require("../db/models");



// Figure out pagination
router.get("/getAllVideos", async(request, response) => {

  try {
    const videos = await models.Video.findAll({
      where: {
        processed: true
      },
      include: [
        {model: models.User, attributes: ['id', 'profile_pic']},
        {model: models.Channel, attributes: ['id', 'name']}
      ]
    });

    return response.status(200).json(videos);
  }catch(error) {
    return response.status(400).json(error);
  }

});





module.exports = router;