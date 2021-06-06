const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');


var apiRouter = require('./app/routes/country.route');

// create express app
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });  

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

// cors
app.use(cors({origin: '*'}));

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

// Require the location routes
require('./app/routes/location.route.js')(app);

// app.get("/feedback", async (req, res) => {
//     const result = await Channel.findOne({ name: "Channel 1" }).populate({
//       path: "feedbacks"
//     });
  
//     res.send(result);
//   });

// listen for requests 
const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log("Server is listening to port 3000 .");
});
