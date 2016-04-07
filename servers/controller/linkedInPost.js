var express=require("express");
var bodyParse= require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var parseString = require('xml2js').parseString;
var ECE9065 = require("../model/DBModel");
var DBModel= mongoose.model('Post_user');


module.exports.create = function(req,res){
var linkedin_access_token=req.body.access_code;  
var message=req.body.message;
var email=req.body.email;
var Url = 'https://api.linkedin.com/v1/people/~/shares?oauth2_access_token=' + linkedin_access_token+'&format=json';
var params = {
 "comment": message,
 "visibility":{
  "code":"anyone"
 }
 
};
 
//Function to Post Message to linkedin
request.post(Url,
{
 body: params,
 json: true
}, function (err, response, body) {
 
 
 if (err) {
                     
                     
                     console.log(err);
		} else {
	       
	        console.log(response.body);
	        console.log(response.body.updateKey);
	        console.log(response.body.updateUrl);


		var linkedin_updateKey=response.body.updateKey;
			var linkedin_updateUrl=response.body.updateUrl;
			
			var DBModel_new=new DBModel({
        
        text:message,
        email:email,
        linkedin_flag:"Y",
        linkedin_updateKey:linkedin_updateKey,
        linkedin_updateUrl:linkedin_updateUrl,
       
            
        
    });
    DBModel_new.save(function(err,result)
    {
        console.log(err);
        console.log(result);
    });  
  
res.send("POSTED to LinkedIn");  
  
   }
   
   
 
 
 });
}

 