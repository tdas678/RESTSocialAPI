//This is to get Oauth token and Oauth token secret

var bodyParser = require("body-parser");
var request = require("request");
var mongoose=require("mongoose");
var ECE9065 = require("../model/DBModel");
var DBModel= mongoose.model('Post_user');



var TwitterAPI = require('node-twitter-api');

var twitter = new TwitterAPI({
	consumerKey: 'AcY1td5HwzlDYMYNdGMjmVJr9',
	consumerSecret: 'MHDTnT7rELja3HR7liFxzdrSvglxvpeQcYeXysZKiz5VJz11xF',
	callback: 'https://tdas4-ece9065-finalproject-tdas4.c9users.io'
});
    
   
module.exports.create = function (req,res){
  
      

twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
	if (error) {
		console.log("Error getting OAuth request token : " + error);
	} else {
		
		
		console.log(requestToken);
		console.log(requestTokenSecret);
		var token={'requestToken':requestToken,'requestTokenSecret':requestTokenSecret};
		res.send(token);
		
	}
});
  
 
}