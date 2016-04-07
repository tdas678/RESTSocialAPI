// JavaScript File

var bodyParser = require("body-parser");
var request = require("request");
var mongoose=require("mongoose");
var ECE9065 = require("../model/DBModel");
var DBModel= mongoose.model('Post_user');;


module.exports.create = function (req,res){
    
 //  res.send("hello");
     var post_id=req.params.param;
   
    
     
    
    DBModel.findOne({'_id':post_id},function(err,result)
    {
        console.log(err);
        console.log(result);
        res.send(JSON.stringify(result));
    });
   
}
   
    