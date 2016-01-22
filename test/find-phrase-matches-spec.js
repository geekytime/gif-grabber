var buildRequest = require("../lib/build-request.js");
var index = require("./index.json");
var findPhraseMatches = require("../lib/find-phrase-matches.js");

describe("find-phrase-matches", function(){
  it("matches nothing on worthless phrases", function(){
    var request = buildRequest("asdfasd qwerqwer zxcvzxcv");
    var results = findPhraseMatches(index, request);
    expect(results).to.have.length(0);
  });

  context("on full phrase match", function(){
    var results;
    var phrase = "i see what you did there";

    beforeEach(function(){
      var request = buildRequest(phrase);
      results = findPhraseMatches(index, request);
    });

    it("contains a list of matches", function(){
      expect(results).to.have.length(3);
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

    context("matches for partial phrases", function(){
      beforeEach(function(){
        var request = buildRequest("thumbs");
        results = findPhraseMatches(index, request);
      });

      it("return empty results", function(){
        expect(results).to.have.length(0);
      });

    });

    context("regular partial matches", function(){
      beforeEach(function(){
        var request = buildRequest("angry pigeon");
        results = findPhraseMatches(index, request);
      });

      it("have a type of `keyword`", function(){
        expect(results[1]).to.have.property("type", "keyword");
      });

      it("have the matching words as the context", function(){
        expect(results[1]).to.have.property("context", "angry");
      });

      it("have the matching words length as the weight", function(){
        expect(results[1]).to.have.property("weight", .5);
      });
    });

  });

});
