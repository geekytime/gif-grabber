var buildRequest = require("../lib/build-request.js");
var findOne = require("../lib/find-one.js");
var index = require("./index.json");

var expectMatchExists = function(input){
  var request = buildRequest(input);
  var result = findOne(index, request);
  expect(result).to.have.property("filename");
};

describe("find-one", function(){
  it("finds a result for single words", function(){
    var request = buildRequest("music");
    var result = findOne(index, request);
    expect(result).to.eql({
      context: "music",
      filename: "Blues-Brothers.gif",
      "type": "keyword-full",
      "weight": 1
    });
  });

  it("finds a result for multiple words", function(){
    var request = buildRequest("tired cat");
    var result = findOne(index, request);
    expect(result).to.eql({
      context: "cat tired",
      filename: "sleeping-cat.gif",
      "type": "keyword-full",
      "weight": 1
    });
  });

  it("finds a result for phrase synonyms", function(){
    var request = buildRequest("worn out");
    var result = findOne(index, request);
    expect(result).to.eql({
      context: "tired",
      filename: "sleeping-cat.gif",
      "type": "keyword-full",
      "weight": 1
    });
  });

  it("finds a result for word synonyms", function(){
    var request = buildRequest("weary lion");
    var result = findOne(index, request);
    expect(result).to.eql({
      context: "cat tired",
      filename: "sleeping-cat.gif",
      "type": "keyword-full",
      "weight": 1
    });
  });

  it("returns undefined for garbage input", function(){
    var request = buildRequest("asdfasdf qwerqwer");
    var result = findOne(index, request);
    expect(result).to.eql({});
  });

  it("returns at least one result for several phrases", function(){
    expectMatchExists("good luck");
    expectMatchExists("hello");
    expectMatchExists("goodbye");
    expectMatchExists("i see what you did there");
    expectMatchExists("hurry");
    expectMatchExists("work");
    expectMatchExists("desk");
    expectMatchExists("pool");
    expectMatchExists("night");
    expectMatchExists("sleepy");
  });

  it("returns partial matches if there are no exact matches", function(){
    expectMatchExists("nice work dude");
    expectMatchExists("friendly face obama");
    expectMatchExists("coolio dog tail");
    expectMatchExists("cat vs dog");
    expectMatchExists("cat vs couch");
  });
});
