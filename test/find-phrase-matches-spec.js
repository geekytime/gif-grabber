var buildRequest = require("../lib/build-request.js");
var index = require("./index.json");
var findPhraseMatch = require("../lib/find-phrase-matches.js");

describe("find-phrase-match", function(){
  it("matches nothing on worthless phrases", function(){
    var request = buildRequest("asdfasd qwerqwer zxcvzxcv");
    var results = findPhraseMatch(index, request);
    expect(results).to.have.length(0);
  });

  context("on full phrase match", function(){
    var results;
    var phrase = "see what you did there";

    beforeEach(function(){
      var request = buildRequest(phrase);
      results = findPhraseMatch(index, request);
    });

    it("contains a list of matches", function(){
      expect(results).to.have.length(12);
    });

    context("full matches", function(){
      it("have a type of `keyword-full`", function(){
        expect(results[0]).to.have.property("type", "keyword-full");
      });

      it("have the input phrase as the match context", function(){
        expect(results[0]).to.have.property("context", phrase);
      });

      it("have the input phrase length as the weight", function(){
        expect(results[0]).to.have.property("weight", 1);
      });

    });

    context("partial matches", function(){
      it("have a type of `keyword`", function(){
        expect(results[1]).to.have.property("type", "keyword");
      });

      it("have the matching words as the context", function(){
        expect(results[1]).to.have.property("context", "you");
      });

      it("have the matching words length as the weight", function(){
        expect(results[1]).to.have.property("weight", .2);
      });
    });

  });

});
