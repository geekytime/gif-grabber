var buildRequest = require("../lib/build-request.js");
var index = require("./index.json");
var SuggestionFinder = require("../lib/suggestion-finder.js");

describe("suggestion-finder", function(){
  var suggestionFinder;

  before(function(){
    suggestionFinder = new SuggestionFinder(index);
  });

  it("finds suggestions for single words", function(){
    var request = buildRequest("monky");
    var result = suggestionFinder.find(request);
    expect(result).to.eql(["money", "bonk"]);
  });

  it("finds suggestions for single words", function(){
    var request = buildRequest("angst kitty");
    var result = suggestionFinder.find(request);
    expect(result).to.eql("anger kitten");
  });

  it("finds suggestions for phrases", function(){
    var request = buildRequest("high fivee");
    var result = suggestionFinder.find(request);
    expect(result).to.eql(["high five"]);
  });
});
