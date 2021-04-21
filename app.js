// Importing needed modules
const epress = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//init epress for useage
const app = epress();

//init cors for useage
app.use(cors());

//Use bodyparser to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//Use bodyparser to parse application/json
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());

//DB config
const db = require('./Config/db-config').mongoURI;

// connection to my cloud mongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => {
        console.log('connected to mongoDB Atlas!');
    })
    .catch(error => {
        console.log('not connected to mongoDB Atlas!');
        console.error(error);
    });

module.exports = app;
