var MeLi = require('./_lib');

var getBestPicture = function (pictures) {
  if (pictures && pictures.length > 0) {
    return pictures[0].url;
  }
  return null;
};

var itemResponseParser = function (jsonResponse) {
  var itemResponse = JSON.parse(jsonResponse);
  var floorPrice = Math.floor(itemResponse.price);
  return {
    id: itemResponse.id,
    title: itemResponse.title,
    price: {
      currency: itemResponse.currency_id,
      amount: floorPrice ,
      decimals: Math.floor((itemResponse.price - Math.floor(floorPrice)) * 100)
    },
    picture: getBestPicture(itemResponse.pictures),
    rawPictures: itemResponse.pictures,
    condition: itemResponse.condition,
    free_shipping: itemResponse.shipping.free_shipping,
    sold_quantity: itemResponse.sold_quantity,
    category_id: itemResponse.category_id
  }
};

var itemDescriptionResponseParser = function (jsonResponse) {
  var itemDescriptionResponse = JSON.parse(jsonResponse);
  var html = itemDescriptionResponse.text;
  var plain = itemDescriptionResponse.plain_text.replace(/(?:\r\n|\r|\n)/g, '<br />');
  var description = html && html.length > 0 ? html : plain && plain.length > 0 ? plain : '';
  return { description: description }
};

var itemCategoriesParser = function (jsonResponse) {
  var itemCategoriesResponse = JSON.parse(jsonResponse);
  var categories = itemCategoriesResponse.path_from_root.map(function (category) {
    return category.name
  });
  return { categories: categories }
};

var itemUrl = 'https://api.mercadolibre.com/items/​:item_id';
var itemDescriptionUrl = 'https://api.mercadolibre.com/items/:item_id/description';
var itemCategoriesUrl = 'https://api.mercadolibre.com/categories/:category_id';
var extend = require('util')._extend;

var item = function (id, callback) {
  var parsedItem = {item: {}},
    _itemUrl = itemUrl.replace(':item_id', id),
    _descriptionUrl = itemDescriptionUrl.replace(':item_id', id),
    _categoriesUrl = '',
    gotItem = false,
    gotDescription = false,
    gotCategories = false;

  var combineResponses = function (response, requestedUrl) {
    if (response === null) {
      callback(null);
    }
    parsedItem.item = extend(parsedItem.item, response);

    gotItem = requestedUrl === _itemUrl || gotItem;
    gotDescription = requestedUrl === _descriptionUrl || gotDescription;
    gotCategories = requestedUrl === _categoriesUrl || gotCategories;

    if (requestedUrl === _itemUrl) {
      _categoriesUrl = itemCategoriesUrl.replace(':category_id', parsedItem.item.category_id);
      MeLi.request({
        url: _categoriesUrl,
        parser: itemCategoriesParser,
        callback: combineResponses
      });
    }

    if (gotItem && gotDescription && gotCategories) {
      callback(parsedItem)
    }
  };

  MeLi.request({
    url: _itemUrl,
    parser: itemResponseParser,
    callback: combineResponses
  });
  MeLi.request({
    url: _descriptionUrl,
    parser: itemDescriptionResponseParser,
    callback: combineResponses
  });
};

module.exports = item;