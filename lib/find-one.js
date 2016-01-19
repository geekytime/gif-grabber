var _ = require("lodash");
var average = require("average");
var findAll = require("./find-all.js");
var random = require("random-weighted-choice");

var findExactMatches = function(match){
  return match.weight == 1 && match.type == "keyword-full";
};

var findMatchesAbove = function(match, weight){
  return match.weight >= weight;
};

var findPartialMatches = function(matches){
  var weights = _.map(matches, "weight");
  var averageWeight = average(weights);
  var findAboveAverage = _.partialRight(findMatchesAbove, averageWeight);
  var aboveAverageMatches = _.filter(matches, findAboveAverage);
  return aboveAverageMatches;
};

var findOne = function(index, request){
  var matches = findAll(index, request);
  // console.log("initial matches", matches);
  var exactMatches = _.filter(matches, findExactMatches);
  if (exactMatches && exactMatches.length){
    return _.sample(exactMatches);
  }

  var partialMatches = findPartialMatches(matches);
  // console.log(partialMatches);
  if (partialMatches && partialMatches.length){
    return _.sample(partialMatches);
  }

  return {};
};

module.exports = findOne;
