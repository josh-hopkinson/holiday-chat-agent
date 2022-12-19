//Importing mongoose to build the data model
const mongoose = require("mongoose");

//Importing schema from mongoose, which will map data to the DB
const { Schema } = require("mongoose");

//Build the model
const AgentMessageSchema = new Schema({
    content: {
        type: String
    },
    content2: {
        type: String
    },
    holidays: [],
    timeSent: {
        type: Date
    },
    archived: {
        type: Boolean,
        default: false
    },
    class: {
        type: String
    }
})

module.exports = mongoose.model("AgentMessage", AgentMessageSchema);