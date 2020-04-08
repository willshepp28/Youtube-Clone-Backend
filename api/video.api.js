require("dotenv").config();

const router = require("express").Router();
const multer = require("multer");


// aws.config.update({
//   secretAccessKey: process.env.AWSCLI_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWSCLI_ACCESS_KEY_ID,
//   region: process.env.AWSCLI_REGION
// });


// const s3 = new aws.S3()
 
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_VIDEO_ORIGINAL_BUCKET,
//     acl: process.env.AWS_ACL,
//     contentType: function(request, file, cb) {
//       cb(null,file.mimetype)
//     },
//     metadata: function (request, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (request, file, cb) {
//       let extArray = file.mimetype.split("/");
//       let extension = extArray[extArray.length - 1];
//       cb(null, file.originalname + '-' + Date.now()+ '.' +extension)
//     }
//   })
// })

const upload2 = multer();




// upload2.single('video')

router.get("/test", (request,response) => {
//   const content = request.file.buffer;

  
//   const range = request.headers.range;
//   const total = content.length;


//   response.writeHead(200, 
//     {"Content-Type": "video/mp4"},
//     {"Content-Length": content.length}
// );
//   response.end(content);
return response.json({
  message: "Entering test"
})
})
/**
 * UPLOAD VIDEOS
 * 
 * Requirements:
 * 1. Users should be authenticated to upload
 * 2. Once a copy of the video is checked for viruses, resized, and uploaded to modified bucket, we should delete video from original bucket
 * 3. If any transloader operation fails the video should be deleted from bucket
 * 
 */
// router.get("/upload", upload.single('video'), async(request, response) => {
//   const obj = {};

//    obj.s3ImageKey = request.file.key;
//    obj.s3LocationPath = request.file.location;
//    obj.s3Bucket = request.file.bucket;
//    obj.description = request.body.description;
//    obj.title = request.body.title;
//    obj.channel_id = parseInt(request.body.channel_id);
//    obj.user_id = parseInt(request.body.user_id);

//    obj.file = request.file;

//   const params = {
//     Bucket: request.file.bucket,
//     Key: request.file.key
//   }

//   // Getting object
//   s3.getObject(params, (error, data) => {
//     if(error) return response.status(400).json(error, error.stack)
//     else {
//       const process = new ffmpeg(data.body);
//       process.then((video) => {
//         video.fnExtractFrameToJPG()
//       })
//       return response.status(200).json(data.body)
//     }

//   })

// });


// router.get("/uploadWithTransloadIt", upload.single('video'), async (request, response) => {

//     const s3ImageKey = request.file.key;
//     const s3LocationPath = request.file.location;
//     const description = request.body.description;
//     const title = request.body.title;
//     const channel_id = parseInt(request.body.channel_id);
//     const user_id = parseInt(request.body.user_id);

//     try {

//       // create thumbnail, and modifiy vido
//       let thumbnail_url = await createThumbnailUploadVideos(s3ImageKey)
//         .then((results) => {
   
//           models.Video.create({
//             user_id: user_id,
//             channel_id: channel_id,
//             streaming_url: results.modified_video_url,
//             thumbnail_url: results.thumbnail_url,
//             title: title,
//             description: description,
//           }).then(() => {
//             return response.status(201).json({
//               message: "Video successfully created!",
//               status: "Ok"
//             });
//           })
//           .catch((error) => {
//             throw new Error(error);
//             return;
//           })
    
//         })
//         .catch((error) => {
//           throw new Error(error)
//           return;
//         })
//     }catch(error) {
//       return response.status(400).json(error)
//     }
//     finally {
//       console.log('complete')
//     }
  
// });





module.exports = router;