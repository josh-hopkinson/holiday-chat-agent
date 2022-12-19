//Import the models
const { MessageModel, AgentMessageModel, HolidayModel } = require("../models");

//Declare the controller
let MessageController = {

    //define request handler
    first: async (req, res) => {

        //try catch to catch any errors
        try {

            //declare agent message text
            let agentMessage = "Say holiday to begin";

            //Save a new record in the collection of agent messages, based off the model
            await new AgentMessageModel({
                timeSent: Date.now(),
                content: agentMessage,
                class: "agent-message"
            }).save();

            //Save a new record in the collection of messages, based off the model - is a copy of agent message but will be hidden
            await new MessageModel({
                timeSent: Date.now(),
                content: agentMessage,
                class: "hidden"
            }).save();

            //send a 200 OK response
            res.status(200).json({
                status: 200, message: agentMessage
            });

        //if any errors then send 400 response to client and log error to console
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: 400, message: "Error Occured", data: error
            });
        }
    },

    keyWord: async (req, res) => {
        
        //try catch to catch any errors
        try {
            
            //Save a new record in the collection of messages, based off the model
            await new MessageModel({
                timeSent: Date.now(),
                content: req.body.content,
                class: "user-message"
            }).save();

            //Save a new record in the collection of agent messages, based off the model - is a copy of message but will be hidden
            await new AgentMessageModel({
                timeSent: Date.now(),
                content: req.body.content,
                class: "hidden"
            }).save();

                //Check if incoming request includes keywords
                if (req.body.content.includes("holiday") || req.body.content.includes("Holiday")) {

                    //declare agent message text
                    let agentMessage = "So you're looking for a holiday? For me to find the perfect holiday for you, I'll need some information. Which contintent would you like to visit? Our current options are Africa, Antartica, Arctic, Asia, Australia, Europe and North America";

                    //Save a new record in the collection of agent messages, based off the model
                    await new AgentMessageModel({
                        timeSent: Date.now(),
                        content: agentMessage,
                        class: "agent-message"
                    }).save();

                    //Save a new record in the collection of messages, based off the model - is a copy of agent message but will be hidden
                    await new MessageModel({
                        timeSent: Date.now(),
                        content: agentMessage,
                        class: "hidden"
                    }).save();

                    //send a 200 OK response
                    res.status(200).json({
                        status: 200, message: agentMessage
                    });

                //If keword not detected then...
                } else {
                
                //declare agent message text
                let agentMessage = "KEYWORDS NOT DETECTED";

                //Save a new record in the collection of agent messages, based off the model
                await new AgentMessageModel({
                    timeSent: Date.now(),
                    content: agentMessage,
                    class: "agent-message"
                }).save();

                //Save a new record in the collection of messages, based off the model - is a copy of agent message but will be hidden
                await new MessageModel({
                    timeSent: Date.now(),
                    content: agentMessage,
                    class: "hidden"
                }).save();

                //send a 200 OK response
                res.status(200).json({
                    status: 403, message: agentMessage
                });

                }

        //if any errors then send 400 response to client and log error to console
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: 400, message: "Error Occured", data: error
            });
        }
    },

    questionOne: async (req, res) => {

        //try catch to catch any errors
        try {

            //Save a new record in the collection of messages, based off the model
            await new MessageModel({
                timeSent: Date.now(),
                content: req.body.content,
                class: "user-message"
            }).save();

            //Save a new record in the collection of agent messages, based off the model - is a copy of message but will be hidden
            await new AgentMessageModel({
                timeSent: Date.now(),
                content: req.body.content,
                class: "hidden"
            }).save();

                //set global variable continent for use in next question, ensuring it is uppercase for the DB query
                global.continent = req.body.content.charAt(0).toUpperCase() + req.body.content.slice(1);

                //Declare holidays and assign the value of anything that has been found in the "Holidays collection" (based off model) with field "Continent" matching the continent declared above
                let holidays = await HolidayModel.find({
                    Continent: global.continent
                })

                //Check that we actually get some holidays back from the query
                if (holidays.length === 0) {

                    //declare agent message text
                    let agentMessage = "Sorry, I couldn't find any holidays for that continent, please check the list above and try again"

                    //Save a new record in the collection of agent messages, based off the model
                    await new AgentMessageModel({
                        timeSent: Date.now(),
                        content: agentMessage,
                        class: "agent-message"
                    }).save();

                    //Save a new record in the collection of messages, based off the model - is a copy of agent message but will be hidden
                    await new MessageModel({
                        timeSent: Date.now(),
                        content: agentMessage,
                        class: "hidden"
                    }).save();

                    //send a 200 OK response
                    res.status(200).json({
                        status: 403, message: agentMessage
                    });

                //If amount of holidays found in the query is greater than 0 then...
                } else {

                    //declare agent message text
                    let agentMessage = "Here are the holidays for " + global.continent + ":"

                    //Save a new record in the collection of agent messages, based off the model
                    await new AgentMessageModel({
                        timeSent: Date.now(),
                        content: agentMessage,
                        holidays: holidays,
                        class: "agent-message"
                    }).save();

                    //Save a new record in the collection of messages, based off the model - is a copy of agent message but will be hidden
                    await new MessageModel({
                        timeSent: Date.now(),
                        content: agentMessage,
                        holidays: holidays,
                        class: "hidden"
                    }).save();

                    
                    //declare agent message 2 text
                    let agentMessage2 = "What is the maximum you want to spend per night for your room on your holiday?"

                    //Save a new record in the collection of agent messages, based off the model
                    await new AgentMessageModel({
                        timeSent: Date.now(),
                        content: agentMessage2,
                        class: "agent-message"
                    }).save();

                    //Save a new record in the collection of messages, based off the model - is a copy of agent message but will be hidden
                    await new MessageModel({
                        timeSent: Date.now(),
                        content: agentMessage2,
                        class: "hidden"
                    }).save();

                    //send a 200 OK response
                    res.status(200).json({
                        status: 200, message: agentMessage, data: holidays, message2: agentMessage2,
                    });
                }

        //if any errors then send 400 response to client and log error to console
        } catch (error) {
            res.status(400).json({
                status: 400, message: "Error Occured", data: error
            });
        }
    },

    questionTwo: async (req, res) => {

        //try catch to catch any errors
        try {

            //Save a new record in the collection of messages, based off the model
            await new MessageModel({
                timeSent: Date.now(),
                content: req.body.content,
                class: "user-message"
            }).save();

            //Save a new record in the collection of agent messages, based off the model - is a copy of message but will be hidden
            await new AgentMessageModel({
                timeSent: Date.now(),
                content: req.body.content,
                class: "hidden"
            }).save();

                //format input for DB query and assign to variable
                let number = Number(req.body.content.replace(/[^0-9.-]+/g,""));

                //Declare holidays and assign the value of anything that has been found in the "Holidays collection" (based off model) with field
                //"Continent" matching the continent declared in global variable and price per night matching incoming number
                let holidays = await HolidayModel.find({ 
                    PricePerNight: { $lte: number },
                    Continent: global.continent
                })

                //Check that we actually get some holidays back from the query
                if (holidays.length === 0) {

                    //declare agent message text
                    let agentMessage = "Sorry, I couldn't find any holidays for that price, please try again"

                    //Save a new record in the collection of agent messages, based off the model
                    await new AgentMessageModel({
                        timeSent: Date.now(),
                        content: agentMessage,
                        class: "agent-message"
                    }).save();

                    //Save a new record in the collection of messages, based off the model - is a copy of agent message but will be hidden
                    await new MessageModel({
                        timeSent: Date.now(),
                        content: agentMessage,
                        class: "hidden"
                    }).save();

                    //send a 200 OK response
                    res.status(200).json({
                        status: 403, message: agentMessage
                    });

                //If amount of holidays found in the query is greater than 0 then...
                } else {

                    //declare agent message text
                    let agentMessage = "Here are the holidays in " + global.continent + " with rooms less than " + number + " per night"

                    //Save a new record in the collection of agent messages, based off the model
                    await new AgentMessageModel({
                        timeSent: Date.now(),
                        content: agentMessage,
                        holidays: holidays,
                        class: "agent-message"
                    }).save();

                    //Save a new record in the collection of messages, based off the model - is a copy of agent message but will be hidden
                    await new MessageModel({
                        timeSent: Date.now(),
                        content: agentMessage,
                        holidays: holidays,
                        class: "hidden"
                    }).save();

                    //declare agent message 2 text
                    let agentMessage2 = "Thank you for using the Holiday Chat Agent, if you would like to use the service again, please press the start again button"

                    //Save a new record in the collection of agent messages, based off the model
                    await new AgentMessageModel({
                        timeSent: Date.now(),
                        content: agentMessage2,
                        class: "agent-message"
                    }).save();

                    //Save a new record in the collection of messages, based off the model - is a copy of agent message but will be hidden
                    await new MessageModel({
                        timeSent: Date.now(),
                        content: agentMessage2,
                        class: "hidden"
                    }).save();

                    //send a 200 OK response
                    res.status(200).json({
                        status: 200, message: agentMessage, data: holidays
                    });
                }

        //if any errors then send 400 response to client and log error to console
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: 400, message: "Error Occured", data: error
            });
        }
    },

    archive: async (req, res) => {
        //try catch to catch any errors
        try {

            //Update all current records in messages collection (based off model)
            await MessageModel.updateMany({
                archived: true
            })

            //Update all current records in agent messages collection (based off model)
            await AgentMessageModel.updateMany({
                archived: true
            })

            //Send 200 OK response and message
            res.status(200).json({
                status: 200, message: "Messages Successfully Archived"
            });

        //if any errors then send 400 response to client and log error to console
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: 400, message: "Error Occured", data: error
            });
        }
    },

    all: async (req, res) => {

        //try catch to catch any errors
        try {

            //Find all records in messages collection (based off model) and assign this
            let message = await MessageModel.find({
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
module.exports = MessageController