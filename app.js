var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var methodOverride = require("method-override");
//var mariaDB = require('./config/mariaDB');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fabricRouter = require('./routes/fabric');
var companyRouter = require("./routes/company");

var app = express();

// view engine setup
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(app.get('port'));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret : '((ICN))',
    resave : false,
    saveUninitialized : true
}));
app.use(cors());
//mariaDB.connect();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fabric', fabricRouter);
app.use("/company", companyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
