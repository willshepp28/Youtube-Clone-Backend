require("dotenv").config();


// Set Encoding Instructions
function s3VideoToThumbnailOptions(video_url){
    return options = {
        params: {
            steps: {
              'import': {
                robot: '/s3/import',
                path: "/" + video_url,
                bucket: process.env.AWS_VIDEO_ORIGINAL_BUCKET,
                key: process.env.AWSCLI_ACCESS_KEY_ID,
                secret: process.env.AWSCLI_SECRET_ACCESS_KEY
              },
              filter: {
                use: 'import',
                robot: '/file/filter',
                accepts: [
                  [
                    '${file.mime}',
                    'regex',
                    'video'
                  ]
                ],
                error_on_decline: true
              },
              viruscheck: {
                use: 'filter',
                robot: '/file/virusscan',
                error_on_decline: true
              },
              thumbnail: {
                use: 'viruscheck',
                robot: '/video/thumbs',
                ffmpeg_stack: 'v3.3.3',
                count: 1
              },
              resized: {
                use: 'thumbnail',
                robot: "/image/resize",
                width: "400",
                height: "400",
                resize_strategy: "fit",
                result: true,
                imagemagick_stack: "v2.0.7"
              },
              'export': {
                use: [
                  'resized'
                ],
                robot: '/s3/store',
                bucket: process.env.AWS_THUMBNAIL_BUCKET,
                key: process.env.AWSCLI_ACCESS_KEY_ID,
                secret: process.env.AWSCLI_SECRET_ACCESS_KEY
              },
            }
          },
          waitForCompletion: true
      };
  };




// Set Encoding Instructions
function s3VideoVirusCheck(video_url){
    return options = {
        params: {
            steps: {
              'import': {
                robot: '/s3/import',
                path: "/" + video_url,
                bucket: process.env.AWS_VIDEO_ORIGINAL_BUCKET,
                key: process.env.AWSCLI_ACCESS_KEY_ID,
                secret: process.env.AWSCLI_SECRET_ACCESS_KEY
              },
              filter: {
                use: 'import',
                robot: '/file/filter',
                accepts: [
                  [
                    '${file.mime}',
                    'regex',
                    'video'
                  ]
                ],
                error_on_decline: true
              },
              viruscheck: {
                use: 'filter',
                robot: '/file/virusscan',
                error_on_decline: true
              },
              resized: {
                use: 'viruscheck',
                robot: "/video/encode",
                width: "1000",
                height: "400",
                resize_strategy: "fit",
                result: true,
                ffmpeg_stack: "v3.3.3",
                preset: "webm",
              },
              'export': {
                use: [
                  'resized'
                ],
                robot: '/s3/store',
                bucket: process.env.AWS_VIDEO_MODIFIED_BUCKET,
                key: process.env.AWSCLI_ACCESS_KEY_ID,
                secret: process.env.AWSCLI_SECRET_ACCESS_KEY
              },
            }
          },
          waitForCompletion: true
      };
  };



  module.exports = {
    s3VideoToThumbnailOptions,
    s3VideoVirusCheck
  }