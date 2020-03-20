const router = require("express").Router();


router.get("/", (request, response) => {
    return response.status(200).json("You are visiting the Youtube-Clone");
});

module.exports = router;