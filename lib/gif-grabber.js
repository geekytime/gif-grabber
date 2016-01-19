var buildRequest = require("../lib/build-request.js");
var findAll = require("./find-all.js");
var findOne = require("./find-one.js");
var SuggestionFinder = require("./suggestion-finder.js");

var GifGrabber = function(index){
  this.index = index;
  this.suggestionFinder = new SuggestionFinder(index);
};

GifGrabber.prototype.findAll = function(input){
  var request = buildRequest(input);
  var matches = findAll(this.index, request);
  matches.suggestions = this.suggestionFinder.find(request);
  return matches;
};

GifGrabber.prototype.findOne = function(input){
  var request = buildRequest(input);
  var matches = findOne(this.index, request);
  matches.suggestions = this.suggestionFinder.find(request);
  return matches;
};

module.exports = GifGrabber;
