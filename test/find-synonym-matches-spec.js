var _ = require("lodash");
var buildRequest = require("../lib/build-request.js");
var findSynonymMatches = require("../lib/find-synonym-matches.js");
var index = require("./index.json");

var expectMatch = function(phrase, expectedMatch){
  var request = buildRequest(phrase);
  var matches = findSynonymMatches(index, request);
  var files = _.map(matches, "filename");
  expect(files).to.contain(expectedMatch);
};

describe("find-synonym-matches", function(){

  it("finds matches for single words", function(){
    expectMatch("weary", "sleeping-cat.gif");
  });

  it("finds matches by phrase synonyms", function(){
    expectMatch("worn out", "sleeping-cat.gif");
  });

  it("finds matches by partial word synonyms", function(){
    expectMatch("weary cat", "sleeping-cat.gif");
  });

  it("finds matches by all word synonyms", function(){
    expectMatch("tired lion", "sleeping-cat.gif");
  });

  it("returns empty matches for garbage words", function(){
    var request = buildRequest("ajsdhfohk kjhsdfjk kjshdfkh");
    var matches = findSynonymMatches(index, request);
    expect(matches).to.eql([]);
  });
});
