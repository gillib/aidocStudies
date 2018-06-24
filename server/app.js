/**
 * Created by 1 on 8/20/2015.
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const respond = require('./components/middlewares/respond');
const errorHandlers = require('./components/middlewares/errorHandlers');

const studies = require('./studies/studies.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(respond());

app.use('/', studies);

app.use(errorHandlers.routeNotFound);

app.use(errorHandlers.errorHandler('dev'));


module.exports = app;