var mongoose=require("mongoose");


//User Schema
var UserSchema=new mongoose.Schema({
    
    User_ID:String,
    email:String,
    verified_email:String,
    name: String,
    givenname: String,
    familyname: String,
    link: String,
    picture: String,
    gender: String,
    
    
});

var commentschema=new mongoose.Schema({
    
   comment:String,
   facebook_created_on:String,
   facebook_user_name:String,
   facebook_comment_id:String,
   twitter_comment_id:String
   
 });


//Posts Schema
var PostSchema=new mongoose.Schema({
    
    text:String,
    email:String,
  //  created_on:{type: Date,default:Date.now().toISOString},
    facebook_flag:{type: String,default:"N"},
    twitter_flag:{type: String,default:"N"},
    linkedin_flag:{type: String,default:"N"},
    facebook_post_id:String,
   // facebook_access_token:String,
    twitter_post_id:String,
    twitter_post_string_id:String,
    twiiter_screen_name:String,
    linkedin_updateKey:String,
    linkedin_updateUrl:String,  
  //  accessToken:String,
 //   accessTokenSecret:String,
    comments:[commentschema]
});

module.exports = mongoose.model('ECE9065_USER',UserSchema);
module.exports = mongoose.model('Post_user',PostSchema);
module.exports = mongoose.model('comment_pst',commentschema);