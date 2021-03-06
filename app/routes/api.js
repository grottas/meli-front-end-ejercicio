var express = require('express');
var router = express.Router();
var MeLiClient = require('../meli_client/client');

router.get('/items', function(req, res) {
  var query = req.query.q;
  var searchCallback = function (results) {
    if (results) {
      res.json(results);
    } else {
      res.status(404);
      res.json(null);
    }
  };
  MeLiClient.items(query, searchCallback);
});

router.get('/items/:item_id', function(req, res) {
  var itemId = req.params.item_id;
  var itemCallback = function (item) {
    if (item) {
      res.json(item);
    } else {
      res.status(404);
      res.json(null);
    }
  };
  MeLiClient.item(itemId, itemCallback)
});


module.exports = router;
