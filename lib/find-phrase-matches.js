var _ = require("lodash");

module.exports = function(index, request){
  var allMatches = [];
  index.forEach(function(entry){
    var wordMatches = _.intersection(entry.tags, request.words);
    if (wordMatches.length > 0){
      var match = {
        filename: entry.filename,
        context: wordMatches.join(" "),
        weight: wordMatches.length/ request.words.length,
        type: "keyword"        
      };
      if (wordMatches.length === request.words.length){
        match.type = "keyword-full";
      }
      allMatches.push(match);
    }
  });
  return allMatches;
};
