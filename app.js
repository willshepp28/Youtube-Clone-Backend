const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("multer")
const API = require("./api/api");
const authenticationAPI = require("./api/authentication.api");
const channelAPI = require("./api/channel.api");
const videosAPI = require("./api/video.api");
const videoUploadAPI = require("./api/video.upload.api");
const commentAPI = require("./api/comment.api");
const verifyAPI = require("./api/auth-verify.api");
const testAPI = require("./api/test.api");
const PORT = process.env.PORT || 5000;


application = express();

application.use(cors());
application.use(helmet());
application.use(morgan("combined"));

application.use(bodyParser.urlencoded({ extended: true}));
application.use(bodyParser.json());


application.get("/", (request, response) => {
    return response.json("Welcome to Youtube clone");
})

application.use("/api", API);
application.use("/api/authentication", authenticationAPI);
application.use("/api/channel", channelAPI);
application.use("/api/videos", videosAPI);
application.use("/api/video-upload", videoUploadAPI);
application.use("/api/comment", commentAPI);
application.use("/api/test", testAPI);
application.use("/api/auth/verify/", verifyAPI);



application.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`);
});