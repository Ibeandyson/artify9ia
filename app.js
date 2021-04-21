// modules importations
const epress = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//init epress for useage
const app = epress();

//init cors for useage
app.use(cors());

//Use bodyparser to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//Use bodyparser to parse application/json
app.use(bodyParser.json());
