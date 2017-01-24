var http = require('./util/http.js').func; 
var promise = require('./util/promise.js');
var getGeneralToken = require('./util/getGeneralToken.js').func;
var getSession = require('./util/getSession.js').func;
var options = require('./options.js');


// Args 
exports.required = ['array'];
exports.optional = ['jar'];

 // Define
function sendTrade(jar, token, array) {
  return function (resolve, reject) {
    var httpOpt = {
      url: '//www.roblox.com/Trade/tradehandler.ashx',
      options: {
        method: 'POST',
        jar: jar,
        headers: {
          'Cookie': '.ROBLOSECURITY=' + getSession({jar: jar}) + ';',
          'X-CSRF-TOKEN': token,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
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
      if (body.success) {
        resolve();
      } else {
        reject(new Error(body.msg));
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
