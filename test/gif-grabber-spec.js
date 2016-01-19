var GifGrabber = require("../lib/gif-grabber.js");
var index = require("./index.json");



describe("gif-grabber", function(){
  var gifGrabber;

  before(function(){
    gifGrabber = new GifGrabber(index);
  })

  it("finds lists of gifs", function(){
    var result = gifGrabber.findAll("monkey");
    expect(result).to.have.length(7);
  });

  it("finds individual gifs", function(){
    var result = gifGrabber.findOne("monkey");
    expect(result).to.have.property("filename");
  });

  it("offers suggestions", function(){
    var result = gifGrabber.findOne("hapy");
    expect(result.suggestions).to.eql([
      "happy",
      "yay",
      "baby",
      "halp",
      "way"
    ]);
  });
});
