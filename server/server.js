'use strict';

const express = require('express');
const app = express();
const session = require("express-session");
const passport = require("passport");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const port = process.env.PORT || 8081;

// static rendering
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use("/vue", express.static(__dirname + "server/node_modules/vue/"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);


app.listen(port, () => console.log(`Magic on ${port}`));

