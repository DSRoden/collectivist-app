'use strict';

var Answer = require('../models/answer'),
    User = require('../models/user');

exports.addResponse = function(req, res){
  Answer.addResponse(req, function(err, answer){
    //console.log('answer>>>>>>>>>', answer);
    req.user.taken = req.user.taken || [];
    req.user.taken.push(req.body.surveyID);
    var results = answer.syncScore();
    User.collection.save(req.user, function(err, num){
      res.send({results:results});
    });
  });
};

//exports.getResults = function(req,res){
  //Answer.findBySurveyId(req.params.surveyID, function(err, answer){
    //var results = answer.syncScore();
    //res.send({results:results});
  //});
//};

exports.all = function(req, res){
  Answer.all(function(err, answers){
    res.send({answers:answers});
  });
};
