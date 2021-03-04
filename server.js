const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to database
mongoose.connect(dbConfig.url , {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log("Successfully connected to database");
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
})

// define a simple route
app.get('/' , (req, res)=> {
    res.json("Welcome to SMARTWATCH Application !");
});

// Require the country routes
require('./app/routes/country.route.js')(app);

// Require the region routes
require('./app/routes/region.route.js')(app);

// listen for requests 
app.listen(3001 , () => {
    console.log("Server is listening to port 3001 .");
});
