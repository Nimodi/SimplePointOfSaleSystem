const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);



const express = require('express');
const bodyParser = require('body-parser');
const users = require('./app/routes/user.routes.js');
const user_auth=require('./app/routes/user_auth.routes.js');


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Simple POS app"});
});

// Require  routes
require('./app/routes/order.routes.js')(app);
app.use('/users', users);
app.use('/user_auth',user_auth);
//require('./app/routes/user.routes.js')(app);
//app.use(require('./routes/user.routes.js'));

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});

