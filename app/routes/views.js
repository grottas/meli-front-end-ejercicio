var express = require('express');
var router = express.Router();
var titleCase = require('title-case');
var common = require('./common');

router.get('/', function(req, res) {
  var templateParams = {
    title: 'Mercado Libre Argentina',
    customMetaDescription: false,
    search: '',
    common: common
  };
  res.render('index', templateParams);
});

router.get('/items', function(req, res) {
  var query = req.query.search;
  if (query.match(/MLA\-?([0-9])+/)) {
    res.redirect('item/' + query)
  } else {
    var metaDescription = 'Encontrá :query en Mercado Libre Argentina. Descubrí la mejor forma de comprar online.';
    var templateParams = {
      title: ':query en Mercado Libre Argentina'.replace(':query', titleCase(query)),
      customMetaDescription: metaDescription.replace(':query', query),
      search: query,
      common: common
    };
    res.render('items', templateParams);
  }
});

router.get('/item/:item_id', function(req, res) {
  var templateParams = {
    search: '',
    itemId: req.params.item_id,
    customMetaDescription: false,
    title: 'Mercado Libre Argentina',
    common: common
  };
  res.render('item', templateParams);
});

module.exports = router;
