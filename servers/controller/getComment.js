		// JavaScript File

		var bodyParser = require("body-parser");
		var request = require("request");
		var mongoose=require("mongoose");
		var ECE9065 = require("../model/DBModel");
		var DBModel= mongoose.model('Post_user');;
		var Twitter = require('twitter');
			 

		module.exports.create = function (req,res){
		 var post_id=req.params.param;
		 var facebook_access_token=req.body.facebookAccessToken;
		 var linkedInaccesstoken=req.body.linkedinAccessToken;
		 var twitteraccessToken=req.body.twitteraccessToken;
		 var twitteraccessSecret=req.body.twitteraccessSecret;
		  
			
			
			if(post_id) {
			
			console.log(post_id);
			
			//Get FACEBOOK Comments
			
		   DBModel.findOne({'_id':post_id,'facebook_flag':"Y",'twitter_flag':"N",'linkedin_flag':"N"},function(err,result)
			{
				console.log(err);
				console.log(result);

		   
		   if(result){
			   
			   // access_token=result.facebook_access_token;
			   var facebook_post_id=result.facebook_post_id;
			   
			var url= "https://graph.facebook.com/"+facebook_post_id+"/comments?access_token="+facebook_access_token;
			
			 request.get({
		 url: url
		 }, function (err, resp, body) {
		 
		 
		 console.log(err);
		 console.log(JSON.parse(resp.body).data);
		 var data=JSON.parse(resp.body).data;
		 
		 if(data)
		 {
		  
		  
		  for( var i=0;i<data.length;i++)
		  {
			  var id=data[i].id;
			  var message=data[i].message;
			  var created_time=data[i].created_time;
			  var name=data[i].from.name;
			  
			  
			   result.comments.push({comment:message,facebook_created_on:created_time,facebook_user_name:name,facebook_comment_id:id});
			   result.save(function(err,result)
			   {
				   console.log("done");
				  // res.send(result);
		  
				
			   });
			  }
			  
		   
			   }

		  });
		  }



		//res.send(result);
		});


		   //GET Twitter Comments
		DBModel.findOne({'_id':post_id,'twitter_flag':"Y",'facebook_flag':"N",'linkedin_flag':"N"},function(err,result)
			{
				console.log(err);
				console.log(result);

		   
		   if(result)
		   {
			
			var tweet_id=result.twitter_post_id;
			var tweet_strn_id=result.twitter_post_string_id;
			var screenName=result.twiiter_screen_name;
			var consumerKey='AcY1td5HwzlDYMYNdGMjmVJr9';
			   var consumerSecret= 'MHDTnT7rELja3HR7liFxzdrSvglxvpeQcYeXysZKiz5VJz11xF';
			 //  var access_token=result.accessToken;
			 //  var accessTokenSecret=result.accessTokenSecret;
			 
		var client = new Twitter({
		  consumer_key: 'AcY1td5HwzlDYMYNdGMjmVJr9',
		  consumer_secret: 'MHDTnT7rELja3HR7liFxzdrSvglxvpeQcYeXysZKiz5VJz11xF',
		  access_token_key: twitteraccessToken,
		  access_token_secret: twitteraccessSecret,
		  callback:'listtweet'
		});
		 

		client.get('search/tweets', {q:'@'+screenName,since_id:'tweet_id'}, function(error, tweets, response){
		   console.log("hello");
		   console.log(error);
		   console.log(tweets);
		  console.log(tweets.statuses);
		   for(var i=0;i<tweets.statuses.length;i++)
		   {
			   console.log("In the loop");
			   console.log(tweets.statuses[i].in_reply_to_status_id);
			   if(tweet_id==tweets.statuses[i].in_reply_to_status_id)
			   {
				  result.comments.push({comment:tweets.statuses[i].text,twitter_comment_id:tweets.statuses[i].id});
				  console.log("saving");
				  result.save(function(err,result)
			   {
				   console.log("done");
				   console.log(result);
		  
				
			   });
			   }
			   else{
				console.log("no comment");
			   }
			   
			   
		   }
		  
		   
		   
		});

		// res.send(result);
			
		   }
			   
		});


		/*

		 DBModel.findOne({'_id':post_id,'facebook_flag':"N",'twitter_flag':"N",'linkedin_flag':"Y"},function(err,result)
			{
				console.log(err);
				console.log(result);
				
				var updateKey=result.linkedin_updateKey;
				var updateUrl=result.linkedin_updateUrl;

		   
		   if(result){
			   
			   // access_token=result.facebook_access_token;
			   var facebook_post_id=result.facebook_post_id;
			   
			var url= "https://api.linkedin.com/v1/people/~/network/updates/key="+updateKey+"/update-comments?oauth2_access_token="+linkedInaccesstoken+"&format=json&secure=true";
		   
			
			 request.get({
		 url: url
		 }, function (err, resp, body) {
		 
		 
		 console.log(err);
		 console.log(resp);
		 var data=JSON.parse(resp.body).data;
		 });
		 
		   }
			});   */


		}
		}

