require("dotenv").config();


const router = require("express").Router();
const AWS = require("aws-sdk");
const {v4} = require('uuid');
const multer = require("multer");



const s3 = new AWS.S3({
    accessKeyId: process.env.AWSCLI_ACCESS_KEY_ID_2,
    secretAccessKey: process.env.AWSCLI_SECRET_ACCESS_KEY_2
});


// upload.single('video') 
router.post("/" ,(request, response) => {
    const key = `${request.body.user_id}/${v4()}.mp4`;

    s3.getSignedUrl('putObject', {
        Bucket: process.env.AWS_VIDEO_ORIGINAL_BUCKET,
        ContentType: 'video/mp4',
        Key: key
    }, (error, url) => {
        if(error){
            return response.status(400).json(error);
        }

        response.status(200).json({key, url})
    })
});


module.exports = router;