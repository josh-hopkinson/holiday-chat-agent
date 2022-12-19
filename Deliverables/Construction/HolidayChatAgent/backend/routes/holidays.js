//Pull in express for building the route
const express = require("express");

//Importing router from express
const router = express.Router();

//Importing Message Controller
const holidayController = require("../controllers/holidayController");

//Declare routes and assign them to methods from controller
router.get("/holidays", holidayController.all)

router.patch("/holidays/:id", holidayController.update)

//export router
module.exports = router;