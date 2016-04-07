// JavaScript File

var bodyParser = require("body-parser");
var request = require("request");
var mongoose=require("mongoose");
var ECE9065 = require("../model/DBModel");
var DBModel= mongoose.model('Post_user');


module.exports.create = function (req,res){
    
    var post=req.body.data;
    var post_id=req.params.param;
    console.log(post);
   console.log(post_id)
    
 // Update the selected Post   
    
  DBModel.find({'_id':post_id},function(err,result)
   {
  console.log(result);
   }).update({$set:{'text':post}},function(err,result){
        
        console.log(err);
        console.log(result);
    });


 /*   
    var DBModel_new=new DBModel({text:post});
    DBModel_new.update(function(err,result)
    {
        console.log(err);
        console.log(result);
    });    
    */
    
  
}