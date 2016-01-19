var findPhraseMatches = require("./find-phrase-matches.js");
var findSynonymMatches = require("./find-synonym-matches.js");

module.exports = function(index, request){
  var phraseMatches = findPhraseMatches(index, request);
  var synonymMatches = findSynonymMatches(index, request);
  var allMatches = [].concat(phraseMatches, synonymMatches);
  return allMatches;
};
