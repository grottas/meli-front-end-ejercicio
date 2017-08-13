var request = require('request');

var requestMeLi = function (options) {
  request(options.url, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      console.log(options.url);
      console.log(err);
      options.callback(null)
    } else {
      var results = options.parser(body);
      options.callback(results, options.url);
    }
  });
};

module.exports = {
  request: requestMeLi
};