'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.port || 3001;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`sputnik flying in port ${port}!`)
});