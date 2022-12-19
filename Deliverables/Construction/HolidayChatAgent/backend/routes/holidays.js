//Pull in express for building the route
const express = require("express");

//Importing router from express
const router = express.Router();

//Importing Message Controller
const holidayController = require("../controllers/holidayController");

// router.post("/holidays", holidayController.create);
router.get("/holidays", holidayController.all)

router.patch("/holidays/:id", holidayController.update)

module.exports = router;