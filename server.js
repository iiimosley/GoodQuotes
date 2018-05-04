'use strict';

const express = require('express');
const app = express();
const routes = require('./server/routes');

const port = process.env.PORT || 8081;

app.use(routes);


app.listen(port, () => console.log(`Magic on ${port}`));

