var buildRequest = require("../lib/build-request.js");

describe("build-request", function(){

  context("given a valid phrase", function(){
    var request;

    beforeEach(function(){
      request = buildRequest("how now brown cow");
    });

    it("saves the phrase", function(){
      expect(request.phrase).to.eql("how now brown cow");
    });

    it("parses the words", function(){
      expect(request.words).to.eql(["how", "now", "brown", "cow"]);
    });

    it("determines the sentiment", function(){
      expect(request.sentiment).to.eql(0);
    });
  });
});
