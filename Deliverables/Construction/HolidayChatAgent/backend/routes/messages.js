//Pull in express for building the route
const express = require("express");

//Importing router from express
const router = express.Router();

//Importing Message Controller
const messageController = require("../controllers/messageController");


//Declare routes and assign them to methods from controller
router.post("/messages/0", messageController.first);
router.post("/messages/1", messageController.keyWord);
router.post("/messages/2", messageController.questionOne);
router.post("/messages/3", messageController.questionTwo);
router.post("/archive", messageController.archive)

router.get("/messages", messageController.all)

//export router
module.exports = router;