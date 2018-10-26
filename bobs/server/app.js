const express = require('express');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./helpers/logger');
const mongoose = require('mongoose');
const config = require('./helpers/config');
const homeRouter = require('./routes/home-router');



/**
 * MongoDB setup
 */
//***************** CURRENTLY OUR CONNECTION DOESNT WORK **********************/
//***************** can you use this in 'helpers/config.js or keep this here and use the values from config.js??? */
mongoose.connect('mongodb://' + config.database.username + ':' 
  + config.database.password + '@'
  + config.database.url + ':'
  + config.database.port + '/'
  + config.database.name, {promiseLibrary: require('bluebird'), useNewUrlParser: true})
  .then(() => logger.debug('Connection to the MongoDB instance was successful'))
  .catch((err) => logger.debug('MongoDB Error: ' + err));

/**
 * Express
 */
let app = express();

/**
 * App: Setup
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false'}));
app.use(express.static(path.join(__dirname, '../dist/bobs')));//***************** nodequiz??? */
app.use('/', express.static(path.join(__dirname, '../dist/bobs')));//***************** nodequiz??? */
app.use(morgan('dev'));

app.use('/api', homeRouter); // wires the homeController to localhost:3000/api

/**
 * Request handler
 */
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  logger.debug(err.message);

  res.status(err.status || 500);
  logger.debug(err.status);

  res.sendStatus(err.status);
});

module.exports = app;

app.use(cookieParser());
