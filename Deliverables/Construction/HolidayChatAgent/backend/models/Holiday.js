//Importing mongoose to build the data model
const mongoose = require("mongoose");

//Importing schema from mongoose, which will map data to the DB
const { Schema } = require("mongoose");

//Build the model
const HolidaySchema = new Schema({
    HolidayReference: {
        type: Number
    },
    HotelName: {
        type: String
    },
    City: {
        type: String
    },
    Continent: {
        type: String,
        enum: [ "Africa", "Antartica" , "Arctic", "Asia", "Australia", "Europe", "North America" ]
    },
    Country:{
        type: String,
    },
    Category:{
        type: String,
        enum: [ "active", "lazy" ]
    },
    StarRating:{
        type: Number,
        enum: [1, 2, 3, 4 , 5]
    },
    TempRating:{
        type: String,
        enum: [ "cold", "hot", "mild"]
    },
    Location:{
        type: String,
        enum: [ "city", "mountain", "sea" ]
    },
    PricePerNight:{
        type: Number,
    },
    Image:{
        type: String
    }
})

module.exports = mongoose.model("Holiday", HolidaySchema);