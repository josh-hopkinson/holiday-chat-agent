//Bringing in express to run the server
const express = require("express");

//Mongoose to allow the server to interact with the database
const mongoose = require("mongoose");

//Add bodyParser to parse incoming requests into req.body
const bodyParser = require("body-parser");

//Enables CORS to stop errors on frontend
const cors = require("cors");

//Routes declared
const messagesRoutes = require("./routes/messages");
const holidayRoutes = require("./routes/holidays");
const agentMessagesRoutes = require("./routes/agentMessages")


//Connecting to the Database
mongoose
    //Enables "Debug mode" which will print all actions to the console log
    .set("debug", (collectionName, method, query, doc) => {
        console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
    })
    .set('strictQuery', true)
    //Connect to the DB
    .connect("mongodb://127.0.0.1:27017/holiday-chat-agent")
    //Display a message in console once connected
    .then(() => {
        console.log("Connected to the Database successfully");
    });


//Starting the server
const app = express();
const PORT = 3000;

//Echo message to console to indicate server is up
app.listen(PORT, () => {
    console.log("Server is listening on port:", PORT);
});

//Tell server to use bodyParser to parse incoming requests
app.use(bodyParser.urlencoded({extended: true}));

//Tell server to use cors to avoid frontend errors
app.use(cors());

//Tell server to use routes
app.use(messagesRoutes);
app.use(holidayRoutes);
app.use(agentMessagesRoutes);

