var _ = require("lodash");
var cartesianProduct = require("cartesian-product");
var findSentiment = require("sentiment");
var matchSentiments = require("./match-sentiments.js");
var thesaurus = require("thesaurus");

var findSentimentMatches = function(wordOrPhrase, sentiment){
  var synonyms = thesaurus.find(wordOrPhrase);

  var matches = matchSentiments(synonyms, sentiment);
  return matches;
};

var findFullPhraseMatches = function(request){
  var sentimentMatches = findSentimentMatches(request.phrase, request.sentiment);
  return sentimentMatches;
};

var findAllSynonyms = function(words){
  var allSynonyms = words.map(function(word){
    var sentiment = findSentiment(word).score;
    var sentimentMatches = findSentimentMatches(word, sentiment);
    sentimentMatches.push(word);
    return sentimentMatches;
  });
  return allSynonyms;
};

var findWordMatches = function(request){
  var allSynonyms = _.uniq(findAllSynonyms(request.words));
  var allCombinations = cartesianProduct(allSynonyms);
  var phrasedMatches = allCombinations.map(function(matches){
    return matches.join(" ");
  });
  return phrasedMatches;
};

module.exports = function(request){
  var fullPhraseMatches = findFullPhraseMatches(request);
  if (fullPhraseMatches.length){
    return fullPhraseMatches;
  }
  if (request.words.length < 3){
    var wordMatches = findWordMatches(request);
    return wordMatches;
  }
  return [];
};
