//Pull in express for building the route
const express = require("express");

//Importing router from express
const router = express.Router();

//Importing Message Controller
const agentMessageController = require("../controllers/agentMessageController");

//Declare routes and assign them to methods from controller
router.get("/agent", agentMessageController.all)
router.post("/agent", agentMessageController.create)

//export router
module.exports = router;