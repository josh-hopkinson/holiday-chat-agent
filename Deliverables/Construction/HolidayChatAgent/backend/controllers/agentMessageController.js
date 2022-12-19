//Import the models
const { MessageModel, AgentMessageModel, HolidayModel } = require("../models");

//Declare the controller
let AgentMessageController = {

    //define request handler
    create: async (req, res) => {

        //try catch to catch any errors
        try {

            //Create new record in AgentMessageModel (based off model) collection with data from request
            let message = new AgentMessageModel({
                content: req.body.content,
                timeSent: Date.now(),
                class: "agent-message"
            }).save();

            //Create new record in AgentMessageModel (based off model) collection with data from request - is a copy of agent message but will be hidden
            new MessageModel({
                content: req.body.content,
                timeSent: Date.now(),
                class: "hidden"
            }).save();

            //Send 200 OK response to client
            res.status(200).json({
                status: 200, data: message, message: "Message added"
            });

        //if any errors then send 400 response to client and log error to console
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: 400, data: error, message: "Invalid Request"
            });
        }
    },

    all: async (req, res) => {

        //try catch to catch any errors
        try {

            //Find all records in agent messages collection (based off model) and assign this
            let message = await AgentMessageModel.find({
                archived: false
            });

            //send 200 OK response and all records found
            res.status(200).json({
                status: 200, data: message
            });
            
        //if any errors then send 400 response to client and log error to console
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: 400, data: error, message: "Invalid Request"
            });
        }
    },
};

//Export the controller to be used elsewhere
module.exports = AgentMessageController