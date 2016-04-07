var bodyParser = require("body-parser");
var request = require("request");
var mongoose=require("mongoose");
var ECE9065 = require("../model/DBModel");
var DBModel= mongoose.model('Post_user');;
var DBModel_cmnt= mongoose.model('comment_pst');

module.exports.create = function (req,res){
 var post_id=req.params.param;
  
    
    
    if(post_id) {
    
    console.log(post_id);
    
   DBModel.findOne({'_id':post_id},function(err,result)
    {
        console.log(err);
        console.log(result);
     //   res.send(JSON.stringify(result));
   // JavaScript File
   
   res.send(result);
   
    });
    
    }}