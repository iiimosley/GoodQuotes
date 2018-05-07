'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./routes');
const port = process.env.PORT || 8081;

// static rendering
app.use(express.static(__dirname + "/public"));
app.use("/vue", express.static(__dirname + "server/node_modules/vue/"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);


app.listen(port, () => console.log(`Magic on ${port}`));

