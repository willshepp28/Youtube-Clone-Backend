const router = require("express").Router();



router.get("/", (request, response) => {
    return response.status(200).json(request.headers.host);
});

module.exports = router;