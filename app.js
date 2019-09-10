var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config();

/*
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// app.use('*', (req, res, next) => {


//   console.log('Entering log level')

//   const domains = ["http://localhost:3000"]
//   var origin = req.headers.origin;
//   app.logLevel1("origin >>> ",origin);

//   if(domains.indexOf(origin) > -1) {
//     app.logLevel1("origin found >>> ",origin);
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }


//   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // res.setHeader('Access-Control-Allow-Origin', 'https://meditation-client.herokuapp.com');


//   //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// })
app.use("*", cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Testing Deployment
// old sengrid key 
// SENDGRID_API_KEY=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

require('./config')(app);
require('./logs')(app)
require('./db/repository')(app, mongoose);
require('./routes')(app, mongoose);
require('./model')(app, mongoose);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next()
});

module.exports = app;
