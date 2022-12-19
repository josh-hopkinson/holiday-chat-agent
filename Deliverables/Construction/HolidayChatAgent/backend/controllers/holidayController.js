//Import the models
const { HolidayModel } = require("../models");

//Declare the controller
let HolidayController = {

    //define request handler
    all: async (req, res) => {

        //try catch to catch any errors
        try {

            //Find all records in holidays collection (based off model) and assign this
            let holiday = await HolidayModel.find();

            //send 200 OK response and all records found
            res.status(200).json({
                status: 200, data: holiday
            });
            
        //if any errors then send 400 response to client and log error to console
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: 400, data: error, message: "Invalid Request"
            });
        }
    },

    update: async (req, res) => {
        try {

            //Find single record based from parameter in holidays collection (based off model), update it with the request contents and then assign this
            let holiday = await HolidayModel.findByIdAndUpdate(req.params.id, req.body);

            //if the variable is empty...
            if (!holiday) {

                //send a 404 response to client saying why
                res.status(404).json({
                    status: 404, data: holiday, message: "Couldn't find holiday"
                });
            
            //if not...
            } else {

                //get the updated record (based from parameter) from the holiday collection (based off model)
                let data = await HolidayModel.findById(req.params.id);

                //send 200 OK and message with updated record
                res.status(200).json({
                    status: 200, data: data, message: "Holiday Edited!"
                });
            }

        //if any errors then send 400 response to client and log error to console    
        } catch (error) {
            console.log(error)
            res.status(400).json({
                status: 400, data: error, message: "Invalid Request"
            });

        }
    }
};

//Export the controller to be used elsewhere
module.exports = HolidayController