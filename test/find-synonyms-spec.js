var buildRequest = require("../lib/build-request.js");
var findSynonyms = require("../lib/find-synonyms.js");

var expectMatch = function(phrase, expectedMatch){
  var request = buildRequest(phrase);
  result = findSynonyms(request);
  expect(result).to.include(expectedMatch);
};

describe("find-synonyms", function(){

  it("returns single-word synonyms", function(){
    expectMatch("hello", "hi");
    expectMatch("bingo", "keno");
    expectMatch("tired", "fatigued");
    expectMatch("angry", "mad");
    expectMatch("music", "sound");
    expectMatch("lion", "cat");

    expectMatch("terrified", "panicked");
    expectMatch("scared", "afraid");
    expectMatch("happy", "glad");
    expectMatch("tortoise", "turtle");
  });

  it("returns full phrase synonyms for known phrases", function(){
    expectMatch("give up", "quit");
    expectMatch("shut up", "be quiet");
    expectMatch("look for", "search");
    expectMatch("cling to", "hold");
    expectMatch("big deal", "big cheese");
    expectMatch("good morning", "greeting");
  });

  it ("returns logical synonyms for groups of words", function(){
    expectMatch("nice poodle", "good dog");
    expectMatch("hairy beast", "downy wolf");
    expectMatch("lazy jerk", "idle dork");
    expectMatch("fancy pizza", "elaborate dish");
  });

  it("includes the original word in the synonym combinations", function(){
    expectMatch("angry birds", "mad birds");
    expectMatch("blissful dog", "happy dog");
  });

  it("skips synonym matching for phrases longer than two words", function(){
    var request = buildRequest("nice work man");
    var result = findSynonyms(request);
    expect(result).to.eql([]);
  });

});
