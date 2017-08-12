var express = require('express');
var router = express.Router();
var MeLiClient = require('./meli_client');

router.get('/items', function(req, res, next) {
  var query = req.query.q
  MeLiClient.search(query, function (results) {
    if (results) {
      res.json(results);
    } else {
      res.sendStatus(404);
    }
  })
});

router.get('/item/:item_id', function(req, res, next) {
  var itemId = req.params.item_id;
  MeLiClient.item(itemId, function (item) {
    if (item) {
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  })
});


module.exports = router;
