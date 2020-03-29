
const { createAssembly } = require("../api/transload-it/assembly.transload.it");


async function createThumbnailUploadVideos(video_url) {
  return Promise.all([
    createAssembly(video_url, 's3VideoToThumbnailOptions'),
    createAssembly(video_url, 's3VideoVirusCheck')
  ])
  .then(function(values) {
    return {
      thumbnail_url: values[0].resized[0].ssl_url,
      modified_video_url: values[1].resized[0].ssl_url
    };
  })
  .catch(error => {
     throw new Error(error);
  })
}


module.exports = {
  createThumbnailUploadVideos
};