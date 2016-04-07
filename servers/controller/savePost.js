// JavaScript File

var bodyParser = require("body-parser");
var request = require("request");
var mongoose=require("mongoose");
var ECE9065 = require("../model/DBModel");
var DBModel= mongoose.model('Post_user');



module.exports.create = function (req,res){
    
    var post=req.body.data;
    var email=req.body.email;
    var newcomment=req.body.comment;
    var id=req.params.param;
  
    
    if(id) {
    
    console.log(id);
    console.log(newcomment);
    
   DBModel.findOne({'_id':id},function(err,result)
    {
        console.log(err);
        console.log(result);
     //   res.send(JSON.stringify(result));
   
   if(result){
       
       result.comments.push({comment:newcomment});
       result.save(function(err,result)
       {
           console.log(err);
           console.log(result);
          // res.send(result);
        
         
       });
   }
   
   
   
   
    });
    
    }
    
    else{
        
         var DBModel_new=new DBModel({
        
        text:post,
        email:email,
        comments:[
            
            {"comment":"Hi this is comment 1"},
           
            ]
        
    });
    DBModel_new.save(function(err,result)
    {
        console.log(err);
        console.log(result);
    });  
        
    }
  //  DBModel_new.close();
}