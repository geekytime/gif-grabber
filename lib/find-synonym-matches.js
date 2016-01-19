var _ = require("lodash");
var buildRequest = require("./build-request.js");
var findPhraseMatches = require("./find-phrase-matches.js");
var findSynonyms = require("./find-synonyms.js");

module.exports = function(index, request){
  var allMatches = [];
  var synonyms = findSynonyms(request);
  synonyms.forEach(function(synonym){
    var synonymRequest = buildRequest(synonym);
    var matches = findPhraseMatches(index, synonymRequest);
    allMatches = allMatches.concat(matches);
  });
  return allMatches;
};
