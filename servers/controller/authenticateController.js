//Declaring Dependencies

var bodyParser = require("body-parser");
var request = require("request");
var mongoose=require("mongoose");
 require("../model/DBModel");
 var ECE9065_user=mongoose.model('ECE9065_USER');


module.exports.create = function (req,res){
    
  //Passing Authorization Code for getting Access Token  
  
     var Client_ID='587593954715-0eht73ffia54el7vt7gg5gjpttp5one3.apps.googleusercontent.com';
     var client_secret='l786oDElu0DMoMKNC7zc9LX6';
     var code=req.body.authcode;
     console.log(code);
      var token_request='code='+code+
        '&client_id='+Client_ID+
        '&client_secret='+client_secret+
        '&redirect_uri=https://tdas4-ece9065-finalproject-tdas4.c9users.io'+
        '&grant_type=authorization_code';
    var request_length = token_request.length;
    console.log("requesting: "+token_request);
    
   //After getting Access Token server is sending request to obtain profile information
     request({
      
         method: 'POST',
          headers: {'Content-length': request_length, 'Content-type':'application/x-www-form-urlencoded'},
          uri:'https://www.googleapis.com/oauth2/v4/token',
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
        
        
        request({
    url: 'https://www.googleapis.com/userinfo/v2/me',
    
    qs: {access_token: access_token}, //Query string data
    method: 'GET', //Specify the method
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
        console.log(JSON.parse(body).family_name);
        data=JSON.parse(body);
        
        //After Obtaining User profile the email is checked if it is present in Mongo DB
        //Incase already present Data is updated else Data is saved as new row.
      
 ECE9065_user.find({'email':data.email},function(err,result){
     
     if (err){
         
  //Save the Data in Mongo DB if not present          
    var DBModel= new ECE9065_user({
            
    User_ID: data.id,
    email:data.email,
    verified_email:data.verified_email,
    name:data.name,
    givenname:data.given_name,
    familyname:data.family_name,
    link:data.link,
    picture:data.picture,
    gender:data.gender,
 //   post:"hello"
        });
        
        DBModel.save(function (err,result){
            res.send(result);
           
            console.log(result); 
            
            });
         
     }
     
     // Else Update the data
     
     else {
         
          ECE9065_user.update({'email':data.email},
          {$set:
          {'User_ID':data.id,
          'verified_email':data.verified_email,
          'name':data.name,'givenname':data.given_name,
          'familyname':data.family_name,
          'link':data.link,
          'picture':data.picture,
          'gender':data.gender}
              
          },function (err,result){
            res.send(data);
           
            console.log(data); 
            
            });
         
     }
 });     
     
        
       // DBModel.close();
    }}
    );
    
    }
     }
     );
        
        
 

}
// JavaScript File