var MeLi = require('./_lib');

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

var itemUrl = 'https://api.mercadolibre.com/items/​:item_id';
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
    parsedItem = extend(parsedItem, response);
    var lastPartOfUrl = requestedUrl.slice(-11);
    gotItem = lastPartOfUrl !== 'description' || gotItem;
    gotDescription = lastPartOfUrl === 'description' || gotDescription;
    if (gotItem && gotDescription) {
      callback(parsedItem)
    }
  };

  MeLi.request({
    url: itemUrl.replace(':item_id', id),
    parser: itemResponseParser,
    callback: combineResponses
  });
  MeLi.request({
    url: itemDescriptionUrl.replace(':item_id', id),
    parser: itemDescriptionResponseParser,
    callback: combineResponses
  });
};

module.exports = item;