
const router = require("express").Router();
const models = require("../db/models");
const {validateToken} = require("../helpers/authentication/validate-token");



// Figure out pagination
router.get("/getAllVideos", async(request, response) => {
  try {
    const videos = await models.Video.findAll({
      where: {
        processed: true
      },
      include: [
        {model: models.User, attributes: ['id', 'profile_pic', 'fullName']},
        {model: models.Channel, attributes: ['id', 'name']},
        {model: models.Comment, include: [models.User]}
      ]
    });

    return response.status(200).json(videos);
  }catch(error) {
    return response.status(400).json(error);
  }
});

// 2 and half ton
// gas 

router.get("/getVideoById", async(request, response) => {
  try {
    const videos = await models.Video.findOne({
      where: {
        id: request.body.id
      }, 
      include: [
        {model: models.User, attributes: ['id', 'profile_pic']},
        {model: models.Channel, attributes: ['id', 'name']},
        {model: models.Comment, attributes: ['*']}
      ]
    });

    return response.status(200).json(videos);
  }catch(error) {
    return response.status(400).json(error);
  }
});




router.post("/addViewsToVideo", validateToken, async(request, response) => {

  // check if the user already has a views associated with video
  // if not the add to do
  try {
    const checkIfUserHasView = await models.VideoView.findOne({
      where: {
        user_id: request.decoded.id,
        video_id: request.body.video_id
      }
    }).then(user => user !== null);

    if(!checkIfUserHasView){
      const addViewToVideo = await models.VideoView.create({
        user_id: request.decoded.id,
        video_id: request.body.video_id
      })
    }

    return response.status(200).json({ message: "View added to Video"});

  }catch(error) {

  }
});





module.exports = router;