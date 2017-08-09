var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/items', function(req, res, next) {
  var templateParams = { search: req.query.search };
  res.render('items', templateParams);
});

router.get('/item/:item_id', function(req, res, next) {
  var templateParams = { itemId: req.params.item_id };
  res.render('item', templateParams);
});

module.exports = router;
