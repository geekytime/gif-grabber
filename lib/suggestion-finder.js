var _ = require("lodash");
var DidYouMean = require("did-you-mean");

var SuggestionFinder = function(index){
  var allTags = _.uniq(_.flatten(_.map(index, "tags")));
  this.matcher = new DidYouMean(allTags);
  this.matcher.ignoreCase();
};

SuggestionFinder.prototype.findPhrase = function(input){
  var list = this.matcher.list(input);
  var results = _.map(list, "value");
  return results;
};

SuggestionFinder.prototype.findWords = function(words){
  var suggestions = words.map(function(word){
    var match = this.matcher.get(word);
    return match;
  }, this);
  return suggestions;
};

SuggestionFinder.prototype.find = function(request){
  var phraseMatches = this.findPhrase(request.phrase);
  if (phraseMatches && phraseMatches.length){
    return phraseMatches;
  }

  var wordMatches = this.findWords(request.words);
  if (wordMatches && wordMatches.length){
    return wordMatches.join(" ");
  }

  return "";
};

module.exports = SuggestionFinder;
