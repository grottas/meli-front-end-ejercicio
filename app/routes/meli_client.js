var request = require('request');

var getBreadcrum = function (searchResponse) {
  if (searchResponse.filters) {
    var filters = searchResponse.filters;
    for (var i=0; i<filters.length; i++) {
      var filter = filters[i];
      if (filter.id == 'category') {
        // values[0] ?
        return filter.values[0].path_from_root.map(function (val) {
          return val.name
        })
      };
    }
  }
};

var searchResponseParser = function (jsonResponse) {
  var searchResponse = JSON.parse(jsonResponse);
  return {
    // author ?
    breadcrum: getBreadcrum(searchResponse),
    results: searchResponse.results.slice(0, 4).map(searchItemResponseParser)
  };
};

var itemResponseParser = function (jsonResponse) {
  var itemResponse = JSON.parse(jsonResponse);
  return {item: itemResponse}
};

var itemDescriptionResponseParser = function (jsonResponse) {
  var itemDescriptionResponse = JSON.parse(jsonResponse);
  var html = itemDescriptionResponse.text;
  var plain = itemDescriptionResponse.plain_text;
  var description = html && html.length > 0 ? html : plain && plain.length > 0 ? plain : '';
  return {description: description, original: itemDescriptionResponse}
};

var requestMeLi = function (options) {
  request(options.url, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      options.callback(null)
    } else {
      var results = options.parser(body)
      options.callback(results, options.url);
    }
  });
};

var searchUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=:query';
var search = function (query, callback) {
  var url = searchUrl.replace(':query', query);
  requestMeLi({
    url: url,
    parser: searchResponseParser,
    callback: callback
  });
};


var itemUrl = 'https://api.mercadolibre.com/items/​:item_id'
var itemDescriptionUrl = 'https://api.mercadolibre.com/items/:item_id/description';
var extend = require('util')._extend;
var item = function (id, callback) {
  var parsedItem = {};
  var gotItem = false;
  var gotDescription = false;
  var combineResponses = function (response, requestedUrl) {
    if (response === null) {
      callback(null);
    }
    parsedItem = extend(parsedItem, response)
    var lastPartOfUrl = requestedUrl.slice(-11);
    gotItem = lastPartOfUrl != 'description' || gotItem;
    gotDescription = lastPartOfUrl == 'description' || gotDescription;
    if (gotItem && gotDescription) {
      callback(parsedItem)
    }
  };

  requestMeLi({
    url: itemUrl.replace(':item_id', id),
    parser: itemResponseParser,
    callback: combineResponses
  });
  requestMeLi({
    url: itemDescriptionUrl.replace(':item_id', id),
    parser: itemDescriptionResponseParser,
    callback: combineResponses
  });
};



var searchItemResponseParser = function (result) {
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
    free_shiping: result.shipping.free_shipping,
    address: result.address
  }
};

module.exports = {
  search: search,
  item: item
}
