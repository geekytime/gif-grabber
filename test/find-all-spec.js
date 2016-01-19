var _ = require("lodash");
var buildRequest = require("../lib/build-request.js");
var findAll = require("../lib/find-all.js");
var index = require("./index.json");

var expectMatch = function(phrase, expectedMatch){
  var request = buildRequest(phrase);
  var matches = findAll(index, request);
  var files = _.map(matches, "filename");
  expect(files).to.contain(expectedMatch);
};

describe("find-all", function(){
  it("finds single word matches",function(){
    expectMatch("music", "Blues-Brothers.gif");
  });

  it("finds multi-word matches",function(){
    expectMatch("dead computer", "DataBSOD.gif");
  });

  it("finds matches by synonym phrase",function(){
    expectMatch("worn out", "sleeping-cat.gif");
  });

  it("finds matches by synonymwords ",function(){
    expectMatch("weary lion", "sleeping-cat.gif");
  });

  it("returns an empty array for garbage input", function(){
    var request = buildRequest("haskjdhf jkhsdfkho ksuyduyqwe");
    var matches = findAll(index, request);
    expect(matches).to.have.length(0);
  });
});
