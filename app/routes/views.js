var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var templateParams = {
    search: req.query.search,
    backboneEntryPoint: null
  };
  res.render('index', templateParams);
});

router.get('/items', function(req, res) {
  // TODO: chequear si la query es un id y entonces redireccionar a la vista del item
  var templateParams = {
    search: req.query.search,
    backboneEntryPoint: 'items.js'
  };
  res.render('items', templateParams);
});

router.get('/item/:item_id', function(req, res) {
  var templateParams = {
    search: '',
    itemId: req.params.item_id,
    backboneEntryPoint: 'item.js'
  };
  res.render('item', templateParams);
});

module.exports = router;
