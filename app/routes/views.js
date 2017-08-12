var express = require('express');
var router = express.Router();
var MeLiClient = require('../meli_client/client');

router.get('/', function(req, res) {
  var templateParams = { search: req.query.search };
  res.render('index', templateParams);
});

router.get('/items', function(req, res) {
  // TODO: chequear si la query es un id y entonces redireccionar a la vista del item
  var templateParams = {search: req.query.search};
  var searchCallback = function (response) {
    if (response) {
      templateParams.response = response;
      res.render('items', templateParams);
    } else {
      res.sendStatus(404);
    }
  };
  MeLiClient.search(templateParams.search, searchCallback);
});

router.get('/item/:item_id', function(req, res) {
  var templateParams = { search: '', itemId: req.params.item_id };
  res.render('item', templateParams);
});

module.exports = router;
