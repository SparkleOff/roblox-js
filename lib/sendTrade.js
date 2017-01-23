var http = require('./util/http.js').func;
var promise = require('./util/promise.js');
var getGeneralToken = require('./util/getGeneralToken.js').func;

// Args
exports.required = ['recipent', 'array'];
exports.optional = [];

// Define
function sendTrade(jar, token, array) {
  return function (resolve, reject) {
    var httpOpt = {
      url: '//www.roblox.com/Trade/tradehandler.ashx',
      options: {
        method: 'POST',
        jar: jar,
        headers: {
          'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
          'X-CSRF-TOKEN': token
        },
        json: {
          AgentOfferList: array
        }
      }
    };
    http(httpOpt)
    .then(function (body) {
      if (body.success) {
        resolve();
      } else {
        reject(new Error(body.message));
      }
    });
  };
}

exports.func = function (args) {
  var jar = args.jar;
  return getGeneralToken({jar: jar})
  .then(function (xcsrf) {
    console.log(xcsrf)
    return promise(sendTrade(jar, xcsrf, args.array));
  });
};
