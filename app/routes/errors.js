var common = require('./common');

module.exports = function (app) {
  // catch 404 and forward to error handler
  app.use(function(req, res) {
    var templateParams = {
      title: 'MercadoLibre Argentina - Parece que esta página no existe',
      customMetaDescription: false,
      search: '',
      common: common
    };
    res.status(404);
    res.render('404', templateParams)
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    var templateParams = {
      title: 'MercadoLibre Argentina - Ha ocurrido un error',
      customMetaDescription: false,
      search: '',
      common: common
    };
    res.render('error', templateParams);
  });
};