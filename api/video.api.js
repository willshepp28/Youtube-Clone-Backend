require("dotenv").config();

const router = require("express").Router();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require('multer-s3')
const { createThumbnailUploadVideos } = require("../helpers/api/thumbnail-generator.api");


aws.config.update({
  secretAccessKey: process.env.AWSCLI_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWSCLI_ACCESS_KEY_ID,
  region: process.env.AWSCLI_REGION
});


const s3 = new aws.S3()
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_VIDEO_ORIGINAL_BUCKET,
    acl: process.env.AWS_ACL,
    contentType: function(request, file, cb) {
      cb(null,file.mimetype)
    },
    metadata: function (request, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (request, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.originalname + '-' + Date.now()+ '.' +extension)
    }
  })
})




router.get("/upload", upload.single('video'), async (request, response) => {

    const s3ImageKey = request.file.key;
    const s3LocationPath = request.file.location;
    const description = request.body.description;
    const channel_id = parseInt(request.body.channel_id);
    const user_id = parseInt(request.body.user_id);

    try {
      let thumbnail_url = await createThumbnailUploadVideos(s3ImageKey)
    }catch(error) {
      return response.status(400).json(error)
    }
    finally {
      console.log('complete')
    }

    return response.status(200).json(thumbnail_url)
  
});





module.exports = router;