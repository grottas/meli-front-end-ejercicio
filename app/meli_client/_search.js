var MeLi = require('./_lib');

var getBreadcrumb = function (searchResponse) {
  if (searchResponse.filters) {
    var filters = searchResponse.filters;
    for (var i=0; i<filters.length; i++) {
      var filter = filters[i];
      if (filter.id === 'category') {
        // values[0] ?
        return filter.values[0].path_from_root.map(function (val) {
          return val.name
        })
      }
    }
  }
};


var searchResponseParser = function (jsonResponse) {
  var searchResponse = JSON.parse(jsonResponse);
  return {
    // author ?
    categories: getBreadcrumb(searchResponse),
    results: searchResponse.results.slice(0, 4).map(searchItemResponseParser)
  };
};


var searchItemResponseParser = function (result) {
  var floorPrice = Math.floor(result.price);
  return {
    id: result.id,
    title: result.title,
    price: {
      currency: result.currency_id,
      amount: floorPrice,
      decimals: Math.floor((result.price - Math.floor(floorPrice)) * 100)
    },
    picture: result.thumbnail,
    condition: result.condition,
    free_shiping: result.shipping.free_shipping,
    address: result.address.state_name
  }
};

var getImageId = function (result) {
  var pictureId = result.picture.split('.com/')[1].slice(0, -6);
  result.pictureid = pictureId;
  return pictureId;
};

var pickBestImageFromVariations = function (variations) {
  var intendedSize = 180;
  var bestVariation = null;
  variations.map(function (variation) {
    var size = variation.size.split('x');
    var width = parseInt(size[0]);
    var height = parseInt(size[1]);
    var isBetter = !bestVariation || width >= intendedSize && height >= intendedSize && width === height;
    if (isBetter) {
      bestVariation = variation;
    }
  });
  return bestVariation.url;
};

var picturesUrl = 'https://api.mercadolibre.com/pictures?ids=:ids';
var getImagesOfSearchResults = function (results, callback) {
  var resultsIds = results.results.map(getImageId).join(',');
  var combineImagesWithResults = function (body) {
    var images = {};
    var response = JSON.parse(body);
    response.map(function (image) {
      images[image.id] = pickBestImageFromVariations(image.variations); // TODO: agarrar mejor imagen
    });
    results.results.map(function (result) {
      result.picture = images[getImageId(result)];
    });
    return results;
  };
  MeLi.request({
    url: picturesUrl.replace(':ids', resultsIds),
    parser: combineImagesWithResults,
    callback: callback
  });
};

var searchUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=:query';
var search = function (query, callback) {
  var getImagesOfSearchResultsAndThenCallback = function (results) {
    getImagesOfSearchResults(results, callback)
  };

  MeLi.request({
    url: searchUrl.replace(':query', query),
    parser: searchResponseParser,
    callback: getImagesOfSearchResultsAndThenCallback
  });
};

module.exports = search;