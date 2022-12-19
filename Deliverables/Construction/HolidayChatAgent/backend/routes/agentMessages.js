//Pull in express for building the route
const express = require("express");

//Importing router from express
const router = express.Router();

//Importing Message Controller
const agentMessageController = require("../controllers/agentMessageController");

router.get("/agent", agentMessageController.all)
router.post("/agent", agentMessageController.create)

module.exports = router;