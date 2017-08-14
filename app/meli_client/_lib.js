var request = require('request');

var requestMeLi = function (options) {
  request(options.url, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      options.callback(null, options.url);
    } else {
      var results = options.parser(body);
      options.callback(results, options.url);
    }
  });
};

module.exports = {
  request: requestMeLi
};