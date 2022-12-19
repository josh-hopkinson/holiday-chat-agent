//Importing mongoose to build the data model
const mongoose = require("mongoose");

//Importing schema from mongoose, which will map data to the DB
const { Schema } = require("mongoose");

//Build the model
const MessageSchema = new Schema({
    content: {
        type: String
    },
    timeSent: {
        type: Date
    },
    holidays: [],
    archived: {
        type: Boolean,
        default: false
    },
    class: {
        type: String,
    }
})

module.exports = mongoose.model("Message", MessageSchema);