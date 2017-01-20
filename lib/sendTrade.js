var http = require('./util/http.js').func;
var promise = require('./util/promise.js');
var getGeneralToken = require('./util/getGeneralToken.js').func;

// Args
exports.required = ['recipent', 'itemsend', 'itemrecieve'];
exports.optional = ['jar', 'robuxaddsend', 'robuxaddrecieve'];

// Define
function message (jar, token, recipent, itemsend, itemrecieve, robuxaddsend, robuxaddrecieve) {
  return function (resolve, reject) {
    var httpOpt = {
      url: '//www.roblox.com/Trade/tradehandler.ashx',
      options: {
        method: 'POST',
        jar: jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          AgentOfferList: [
            AgentID: 2332232,
            OfferList: [
                Name: 'sefe',
            ]
          ]  
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
    return promise(message(jar, xcsrf, args.recipient, args.subject, args.body));
  });
};
