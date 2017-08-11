var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var partials = require('express-partials');
app.use(partials());

var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var logger = require('morgan');
app.use(logger('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(cookieParser());

var sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  outputStyle: 'compressed',
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.render('404')
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
