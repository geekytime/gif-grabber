var findSentiment = require("sentiment");
var matchSentiments = require("../lib/match-sentiments.js");
var thesaurus = require("thesaurus");

var expectMatches = function(word, expectedLength){
  var sentimentToMatch = findSentiment(word).score;
  var wordsToMatch = thesaurus.find(word);
  var result = matchSentiments(wordsToMatch, sentimentToMatch);
  expect(result).to.have.length(expectedLength);
};

describe("match-sentiments", function(){

  it("matches same sentiments first", function(){
    expectMatches("amazing", 6);
    expectMatches("terrible", 20);
  });

});
