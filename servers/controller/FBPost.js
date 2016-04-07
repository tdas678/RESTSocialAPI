// JavaScript File

var bodyParser = require("body-parser");
var request = require("request");
var mongoose=require("mongoose");
var ECE9065 = require("../model/DBModel");
var DBModel= mongoose.model('Post_user');


module.exports.create = function (req,res){
    
    var token=req.body.access_token;
    var message=req.body.post;
    var email=req.body.email;
    console.log(token);
    console.log("token received");
  
 // Specify the URL and query string parameters needed for the request
 var url = 'https://graph.facebook.com/me/feed';
 var params = {
 access_token: token,
 message: message
 };
 
 // Send the request
 request.post({
 url: url,
 qs: params
 }, function (err, resp, body) {
 
 
 console.log(err);
 console.log(resp);
 var facebookPost_id=JSON.parse(resp.body).id;
 console.log(facebookPost_id);
 
 var DBModel_new=new DBModel({
        
        text:message,
        email:email,
        facebook_flag:"Y",
        facebook_post_id:facebookPost_id,
   //     facebook_access_token:token
            
        
    });
    DBModel_new.save(function(err,result)
    {
        console.log(err);
        console.log(result);
    });  
  
res.send("POSTED to FaceBook");
  
   });
    
   
// Save the Post

 
}