var express = require('express');
var path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var favicon = require('serve-favicon');
const logger = require('./helpers/logger');
const mongoose = require('mongoose');
const config = require('./helpers/config');
const homeRouter = require('./routes/home-router');
//for logs
const fs = require('fs');
const rfs = require('rotating-file-stream');
mongoose.Promise = require('bluebird');

//added these, fix these?
var cookieParser = require('cookie-parser');

// few more for authentication
// var passport = require ('passport');
// require('./server/models/db');, require('./server/config/passport');

//app.use(passport.initialize());
//app.use('/server',routesApp); //check back on this




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


//logger
//logs stuff
let logDirectory = path.join(__dirname, '../log');
console.log(__dirname);
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

let accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});
/**
 * App: Setup
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false'}));
app.use(express.static(path.join(__dirname, '../dist/bobs')));//***************** nodequiz??? */
app.use('/', express.static(path.join(__dirname, '../dist/bobs')));//***************** nodequiz??? */
app.use(morgan('combined', {stream: accessLogStream}));

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



/*
app.get("/501", function(request, response) {
  response.status(501);
  response.json({
      error: "Please contact the administrator."
  })
});
*/

module.exports = app;

app.use(cookieParser());
