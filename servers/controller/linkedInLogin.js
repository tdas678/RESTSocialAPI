var bodyParser = require("body-parser");
var request = require("request");
var mongoose=require("mongoose");
var ECE9065 = require("../model/DBModel");
var DBModel= mongoose.model('Post_user');

module.exports.create = function (req,res){
 
      
//Passing Authorization Code for getting Access Token  
  
     var Client_ID='77n73bv3dbpycx';
     var client_secret='j25pzhUplq2R1CdI';
     var code=req.params.param;
     console.log(code);
      var token_request='grant_type=authorization_code&code='+code+
      '&redirect_uri=https://tdas4-ece9065-finalproject-tdas4.c9users.io&client_id='+Client_ID+
        '&client_secret='+client_secret;
    var request_length = token_request.length;
    console.log("requesting: "+token_request);
    
   //After getting Access Token server is sending request to obtain profile information
     request({
      
         method: 'POST',
          headers: {'Content-length': request_length, 'Content-type':'application/x-www-form-urlencoded'},
          uri:'https://www.linkedin.com/uas/oauth2/accessToken',
          body: token_request
        
     }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log("Authentication Successful");
        console.log(response.statusCode, body);
        var data=JSON.parse(body);
        console.log(data.access_token);
        var access_token=data.access_token;
        res.send(access_token);
        
}
});
  
 
}