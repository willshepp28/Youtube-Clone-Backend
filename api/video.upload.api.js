require("dotenv").config();


const router = require("express").Router();
const AWS = require("aws-sdk");
const {v4} = require('uuid');
const { validateToken } = require("../helpers/authentication/validate-token");
const models = require("../db/models");



const s3 = new AWS.S3({
    accessKeyId: process.env.AWSCLI_ACCESS_KEY_ID_2,
    secretAccessKey: process.env.AWSCLI_SECRET_ACCESS_KEY_2,
    signatureVersion: process.env.AWS_SIGNATURE,
    region: process.env.AWS_REGION
});




router.post("/" , validateToken, async(request, response) => {
    const bucket_key = `${request.decoded.id}/${v4()}.mp4`; 
    const description = request.body.value.description;
    const title = request.body.value.title;

    s3.getSignedUrl('putObject', {
        Bucket: process.env.AWS_VIDEO_ORIGINAL_BUCKET,
        ContentType: 'video/mp4',
        Key: bucket_key
    }, async (error, url) => {
        if(error){
            return response.status(400).json(error);
        }

        try {
            const getChannelId = await models.Channel.findOne({
                where: { user_id: request.decoded.id},
                attributes: ['id']
            });

            const createVideo = await models.Video.create({
                    user_id: request.decoded.id,
                    channel_id: getChannelId.id,
                    key: bucket_key,
                    title: title,
                    description: description
            });

            response.status(200).json({bucket_key, url})
        }
        catch(error){
            console.log(error);
            return response.status(400).json(error);
        }
    })
});


module.exports = router;

