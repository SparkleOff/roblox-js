// Includes
var http = require('./http.js').func;
var promise = require('./promise.js');
var parser = require('cheerio');

// Args
exports.required = ['group'];

// Define
function getGroupFunds (group) {
  return function (resolve, reject) {
    http({url: 'https://www.roblox.com/My/Groups.aspx?gid=' + group})
    .then(function (body) {
      var $ = parser.load(body);
      var funds = $('.robux').text();
      resolve(funds);
    });
  };
}

exports.func = function (args) {
  return promise(getGroupFunds(args.group));
};
