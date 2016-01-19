var _ = require("lodash");
var findSentiment = require("sentiment");

module.exports = function(phrase){
  var words = _.words(phrase);
  var sentiment = findSentiment(phrase).score;
  var request = {
    phrase: phrase,
    words: words,
    sentiment: sentiment
  };
  return request;
};
