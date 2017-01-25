var http = require('./util/http.js').func;
var promise = require('./util/promise.js');
var getGeneralToken = require('./util/getGeneralToken.js').func;
var options = require('./options.js');

// Args
exports.required = ['array'];
exports.optional = ['jar'];

 // Define
function sendTrade (jar, token, array) {
  return function (resolve, reject) {
    var httpOpt = {
      url: '//www.roblox.com/Trade/tradehandler.ashx',
      options: {
        method: 'POST',
        jar: jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        form: {
          cmd: 'send',
          TradeJSON: array
        }
      }
    };
    console.log(httpOpt);
    http(httpOpt)
    .then(function (body) {
      console.log(body);
      var json = JSON.parse(body);
      if (json.success) {
        resolve();
      } else {
        reject(new Error(json.msg));
      }
    });
  };
}
exports.func = function (args) {
  var jar = args.jar || options.jar;
  return getGeneralToken({jar: jar})
  .then(function (xcsrf) {
    return promise(sendTrade(jar, xcsrf, args.array));
  });
};
