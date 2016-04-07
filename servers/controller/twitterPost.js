// POST To twitter Logged in Account

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


module.exports.create = function(req,res){


    var requestToken=req.body.requestToken;
    var requestTokenSecret=req.body.requestTokenSecret;
    var oauth_verifier=req.body.oauth_verifier;
    var post=req.body.post;
    var email=req.body.email;
  twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
	if (error) {
		console.log(error);
	} else {
		  console.log(accessToken);
		  console.log(accessTokenSecret);
		  var a={'accessToken':accessToken,'accessTokenSecret':accessTokenSecret};
		  twitter.statuses("update", {
		status: post
	},
	accessToken,
	accessTokenSecret,
	function(error, data, response) {
		if (error) {
                     
                     
                     console.log(error);
		} else {
	       
	        console.log(data);
			var twitter_post_id=data.id;
			var twitter_post_string_id=data.id_str;
			var twitter_screen_name=data.user.screen_name;
			console.log(twitter_screen_name);
			var DBModel_new=new DBModel({
        
        text:post,
        email:email,
        twitter_flag:"Y",
        twitter_post_id:twitter_post_id,
        twitter_post_string_id:twitter_post_string_id,
        twiiter_screen_name:twitter_screen_name
    //    accessToken:accessToken,
    //    accessTokenSecret:accessTokenSecret
            
        
    });
    DBModel_new.save(function(err,result)
    {
        console.log(err);
        console.log(result);
    });  
  
res.send(a);
  
   } });
	}	
			
		});
		
		
		
		
		
	}



 
 
 

