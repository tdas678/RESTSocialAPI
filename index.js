
//Set up of Express Server and subsequent required Dependencies
var express = require("express");
var app  =  express();
var request= require("request");
var bodyParser = require("body-parser");
var AuthController = require('./servers/controller/authenticateController');             //Authorization Authentication at server end
var mongoose = require('mongoose');
var PostController = require('./servers/controller/savePost');                           //Posting Controller
var TrackController = require('./servers/controller/trackPost');                         //Tracking Post Controller
var ShowController = require('./servers/controller/showPost');                           //show Post
var ShowControlleronly = require('./servers/controller/forDELUp');                       //only show post
var DeleteController = require('./servers/controller/delPost');                          //Delete Post
var UpdateController = require('./servers/controller/updatePost');                       //Update Post
var CommentController = require('./servers/controller/savePost');                        //Store Comment
var GetCmntController = require('./servers/controller/getComment'); 
var LinkedInLoginController = require('./servers/controller/linkedInLogin'); 
var FBPOST= require('./servers/controller/FBPost');

var tweet= require('./servers/controller/twitterLogin'); 
var tweetP= require('./servers/controller/twitterPost'); 
var linkedinPost= require('./servers/controller/linkedInPost');                           //Linked In Post
mongoose.connect('mongodb://127.0.0.1:27017/ECE9065_Project');                            //Establish Connection to MongoDB



//Stativ client side CSS/JS
app.use('/JS',express.static(__dirname + '/Application/JS'));
app.use('/CSS',express.static(__dirname + '/Application/CSS'));
app.use('/Images',express.static(__dirname + '/Application/Images'));

//Body Parseto print data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',function(req,res){
    
    res.sendFile(__dirname + '/Application/Login.html')
});

 app.get('/Index',function(req,res){
    
      res.sendFile(__dirname + '/Application/Index.html')
 });


app.get('/View/Posting.html',function(req,res){
    
    res.sendFile(__dirname + '/Application/View/Posting.html')
}); 

app.get('/View/Posting_DU/:param',function(req,res){
    
    res.sendFile(__dirname + '/Application/View/Posting_DU.html')
}); 


app.get('/View/PostTracking/:param',function(req,res){
    
    res.sendFile(__dirname + '/Application/View/PostTracking.html')
});

app.get('/View/SpecificPostComments.html',function(req,res){
    
    res.sendFile(__dirname + '/Application/View/SpecificPostComments.html')
});

app.get('/View/SpecificPostComments/:param',function(req,res){
    
    res.sendFile(__dirname + '/Application/View/SpecificPostComments.html')
});


//Function to handle the Access Token Authentication     
app.post('/api/authenticate',AuthController.create);
    
app.post('/api/storepost',PostController.create);

app.get('/api/tracking/:param',TrackController.create);
app.get('/api/showpost/:param',ShowController.create);
app.post('/api/getComment/:param',GetCmntController.create);
app.get('/api/showpostonly/:param',ShowControlleronly.create);
app.delete('/api/delpost/:param',DeleteController.create);
app.put('/api/updatepost/:param',UpdateController.create);
app.post('/api/storecomment/:param',CommentController.create);
app.get('/api/linkedinLogin/:param',LinkedInLoginController.create);
app.post('/api/fbpost',FBPOST.create);
app.get('/api/twitterLogin',tweet.create);
app.post('/api/twitterPost',tweetP.create);
app.post('/api/linkedinPost',linkedinPost.create);





app.listen(process.env.PORT,function()
{
    console.log('The Server is UP');
   
});

