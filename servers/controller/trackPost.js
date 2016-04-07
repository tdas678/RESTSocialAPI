// JavaScript File

var express=require("express");
var bodyParse= require("body-parser");
var mongoose = require("mongoose");

var ECE9065 = require("../model/DBModel");
var DBModel= mongoose.model('Post_user');


module.exports.create = function(req,res){
    
    var email=req.params.param;
    console.log(email);
    
 // Send the previous post from Mongo DB   
    DBModel.find({'email':email},function(err,result){
        
        console.log(err);
        console.log(result);
        res.send(result);
        
    });

}
