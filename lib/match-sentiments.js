var _ = require("lodash");
var findSentiment = require("sentiment");

module.exports = function(words, sentiment){
  var sentimentMatches = _.filter(words, function(word){
    var wordSentiment = findSentiment(word).score;
    var bothPositive = wordSentiment >= 0 && sentiment >= 0;
    var bothNegative = wordSentiment <= 0 && sentiment <= 0;
    return bothPositive || bothNegative;
  });
  if (sentimentMatches.length > 0){
    return sentimentMatches;
  } else {
    return words;
  }
};
