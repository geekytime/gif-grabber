#!/usr/bin/env node
var _ = require("lodash");
var axios = require("axios");
var findOne = require("../lib/find-one.js");

var rootUrl = "http://geekytime.github.io/gifs/";

axios.get(rootUrl + "index.json").then(function(result){
  var index = result.data;
  var args = _.slice(process.argv,2);
  var input = args.join(" ");  
  var gif = findOne(index, input);
  var gifUrl = rootUrl + "gifs/" + gif.filename;
  console.log(gifUrl);
})
