/**
 * Created by aneri on 29-04-2016.
 */
var mysql = require('./mysql');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/amazon_fresh";



exports.doShowProductList = function(msg, callback)
{
  console.log("Product JSON ");
  
  var JSON = {"FARMER_ID" : msg.FARMER_ID,"IS_APPROVED": msg.IS_APPROVED};
  console.log(JSON);
  mongo.find('PRODUCTS',JSON,function(err,searchRes){

    if(err){
      throw err;
    }
    else
    {
      
      if(searchRes){
        var jsonResponse = {
          "searchResults" : searchRes,
          "statusCode" : 200
        };
        callback(null, jsonResponse);
      }
      else {
        jsonResponse = {result : "Nothing Found", "status" : "OK"};
        callback(null, jsonResponse);
      }
    }
  });
}

exports.doShowFarmerProfile = function(msg, callback)
{
  console.log("Product JSON ");
  
  var JSON = {"USER_ID" : msg.USER_ID};
  console.log(JSON);
  mongo.findOne('USER_DETAILS',JSON,function(err,searchRes){

    if(err){
      throw err;
    }
    else
    {
      console.log("Result received in doShowFarmerProfile");
      if(searchRes){
        var jsonResponse = {
          "searchResults" : searchRes,
          "statusCode" : 200
        };
        callback(null, jsonResponse);
      }
      else {
        jsonResponse = {result : "Nothing Found", "status" : "OK"};
        callback(null, jsonResponse);
      }
    }
  });
}

exports.doUpdateProfile = function(msg, callback)
{
  console.log("Product JSON ");
  
  var updatedWhereJSON = msg.updatedWhereJSON;
  var updatedDetailJSON = msg.updatedDetailJSON
  
  mongo.updateOne('USER_DETAILS',updatedWhereJSON,updatedDetailJSON,function(err,searchRes){

    if(err){
      throw err;
    }
    else
    {
      console.log("Result received in doUpdateProfile");
      if(searchRes){
        var jsonResponse = {
          "searchResults" : searchRes,
          "statusCode" : 200
        };
        callback(null, jsonResponse);
      }
      else {
        jsonResponse = {result : "Nothing Found", "status" : "OK"};
        callback(null, jsonResponse);
      }
    }
  });
}

exports.doAddIntroduction = function(msg, callback)
{
  console.log("Product JSON ");
  
  var updatedWhereJSON = msg.WhereJSON;
  var updatedDetailJSON = msg.introductionSetJSON
  
  mongo.updateOne('FARMER_DETAILS',updatedWhereJSON,updatedDetailJSON,function(err,searchRes){

    if(err){
      throw err;
    }
    else
    {
      console.log("Result received in doUpdateProfile");
      if(searchRes){
        var jsonResponse = {
          "searchResults" : searchRes,
          "statusCode" : 200
        };
        callback(null, jsonResponse);
      }
      else {
        jsonResponse = {result : "Nothing Found", "status" : "OK"};
        callback(null, jsonResponse);
      }
    }
  });
}

exports.doDeleteProfile = function(msg, callback)
{
  console.log("Product JSON ");
  
  var updatedWhereJSON = msg.deleteWhereJSON;
  var updatedDetailJSON = msg.deleteSetJSON
  
  mongo.updateOne('USER_DETAILS',updatedWhereJSON,updatedDetailJSON,function(err,searchRes){

    if(err){
      throw err;
    }
    else
    {
      if(searchRes){
          console.log("Result received in doDeleteProfile");
          var deleteQuery = "UPDATE USERS SET IS_APPROVED = " + 0 +" WHERE USER_ID = "+ updatedWhereJSON.USER_ID;
          mysql.updateData(deleteQuery,function (err, results) {
            if(err){
              throw err;
            }else{
                var jsonResponse = {
                "searchResults" : searchRes,
                "statusCode" : 200
                };
                callback(null, jsonResponse);
              }
          });
        }
      else {
      
          jsonResponse = {result : "Nothing Found", "status" : "OK"};
          callback(null, jsonResponse);
        }
      
    }   
  });
}

exports.addFarmerReview = function(msg, callback)
{
  console.log("Product JSON ");
  
  var productWhereJSON = msg.productWhereJSON;
  var productSetJSON = msg.productSetJSON
  var updateAvgRating = msg.updateAvgRating;
  mongo.updateOne('FARMER_DETAILS',productWhereJSON,productSetJSON,function(err,searchRes){

    if(err){
      throw err;
    }
    else
    {
      console.log("Result received in addFarmerReview");
      if(searchRes){
          mongo.updateOne('FARMER_DETAILS',productWhereJSON,updateAvgRating,function(err,reviews){
          if(err){
            throw err;
            json_responses = {"statusCode" : 401};
            console.log("Error in doShowProductList");
            res.send(json_responses);
          }
        else{
            var jsonResponse = {
                                "searchResults" : reviews,
                                "statusCode" : 200
                        };
            callback(null, jsonResponse);
        }
      });
    }
    else {
        jsonResponse = {result : "Nothing Found", "status" : "OK"};
        callback(null, jsonResponse);
      }
    }
  });
}

exports.getFarmerDetails = function(msg, callback)
{
  console.log("Product JSON ");
  
 var detailJSON = msg.detailJSON;

  mongo.findOne('USER_DETAILS', detailJSON,function(err,searchRes){

    if(err){
      throw err;
    }
    else
    {
      console.log("Result received in getFarmerDetails");
      if(searchRes){
          mongo.findOne('FARMER_DETAILS', detailJSON,function(err,results){
          if(err){
            throw err;
            json_responses = {"statusCode" : 401};
            console.log("Error in doShowProductList");
            res.send(json_responses);
          }
        else{
            var jsonResponse = {
                                "searchResults" : searchRes,
                                "results" : results,
                                "statusCode" : 200
                        };
            callback(null, jsonResponse);
        }
      });
    }
    else {
        jsonResponse = {result : "Nothing Found", "status" : "OK"};
        callback(null, jsonResponse);
      }
    }
  });
}
