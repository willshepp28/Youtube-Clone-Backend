const router = require("express").Router();
const models = require("../db/models");
const _ = require("lodash");

/**
 * REQUIRMENTS
 * 1. User should be able to login
 * 2. Users should be able to register
 */




router.post("/register", (request, response) => {
    const input = request.body;

    return response.status(200).json({
        message: "You are in the register path"
    })
})





router.post("/login", (request, response) => {
    const input = request.body;

    return response.status(200).json({
        message: "You are in the login path"
    })
});


module.exports = router;