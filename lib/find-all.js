var buildRequest = require("./build-request.js");
var findPhraseMatches = require("./find-phrase-matches.js");
var findSynonymMatches = require("./find-synonym-matches.js");

module.exports = function(index, phrase){
  var request = buildRequest(phrase);
  var phraseMatches = findPhraseMatch(index, request);
  if (phraseMatches.length == 0){
    var synonymMatches = findSynonymMatches()
  }

  return [].concat(exactMatches, fuzzyMatches);
};
