var express = require('express');
var path = require('path');
var app = express();

var compression = require('compression');
app.use(compression({
  threshold : 0,
  filter: function () { return true; }
}));

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

app.use(express.static(path.join(__dirname, 'public')));

var viewRoutes = require('./routes/views');
app.use('/', viewRoutes);
var apiRoutes = require('./routes/api');
app.use('/api/', apiRoutes);
var errorHandlers = require('./routes/errors');
errorHandlers(app);

module.exports = app;
