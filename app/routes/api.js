var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/items', function(req, res, next) {
  var query = req.query.q
  var url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + query;
  request(url, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      return res.sendStatus(500);
    }
    var jsonResponse = JSON.parse(body).results;
    var items = jsonResponse.map(function (result) {
      var price = Math.floor(result.price);
      return {
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: price,
          decimals: price - Math.floor(price)
        },
        picture: result.thumbnail,
        condition: result.condition,
        free_shiping: result.shipping.free_shipping
      }
    });
    res.json(items);
  });
});

router.get('/item/:item_id', function(req, res, next) {
  var itemId = req.params.item_id;
  var itemResponse = {};
  var updateResponse = function(jsonResponse, responseType) {
    if (responseType == 'item') {
      var price = jsonResponse.price;
      itemResponse.sold_quantity = jsonResponse.sold_quantity;
      itemResponse.picture = jsonResponse.pictures[0].url;
      itemResponse.condition = jsonResponse.condition;
      itemResponse.free_shipping = jsonResponse.shipping.free_shipping;
      itemResponse.item = {
        id: jsonResponse.id,
        title: jsonResponse.title,
        price: {
          currency: jsonResponse.currency_id,
          amount: price,
          decimals: price - Math.floor(price)
        }
      };
      itemResponse.author = {

      };
    } else {
      itemResponse.description = jsonResponse.text;
    }
    if (itemResponse.item && itemResponse.description) {
      res.json(itemResponse);
    }
  };

  var itemUrl = 'https://api.mercadolibre.com/items/​' + itemId;
  request(itemUrl, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      return res.sendStatus(500);
    }
    var jsonResponse = JSON.parse(body);
    updateResponse(jsonResponse, 'item')
  });

  var descriptionUrl = 'https://api.mercadolibre.com/items/' + itemId + '/description';
  request(descriptionUrl, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      return res.sendStatus(500);
    } else {
      var jsonResponse = JSON.parse(body);
      updateResponse(jsonResponse, 'description');

    }
  });
});


module.exports = router;
