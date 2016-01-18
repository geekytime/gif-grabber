var _ = require("lodash");
var cartesianProduct = require("cartesian-product");
var findSentiment = require("sentiment");
var thesaurus = require("thesaurus");

var findSentimentMatches = function(wordOrPhrase, sentiment){
  var synonyms = thesaurus.find(wordOrPhrase);
  if (wordOrPhrase === "lazy" || wordOrPhrase === "jerk"){
    console.log("synonymns for " + wordOrPhrase, synonyms);
  }
  var sentimentMatches = _.select(synonyms, function(synonym){
    var synonymSentiment = findSentiment(synonym).score;
    return synonymSentiment === sentiment;
  });
  if (sentimentMatches.length > 0){
    return sentimentMatches;
  } else {
    return synonyms;
  }
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
    if (word === "lazy" || word === "jerk"){
      console.log("sentimentMatches for " + word, sentimentMatches);
    }
    return sentimentMatches;
  });
  return allSynonyms;
};

var findWordMatches = function(request){
  var allSynonyms = findAllSynonyms(request.words);
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
  var wordMatches = findWordMatches(request);
  return wordMatches;
};
