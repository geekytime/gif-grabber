var findSynonyms = require("./find-synonyms.js");

module.exports = function(index, request){
  var phraseSynonyms = findSynonyms(request.phrase);
};
