'use strict';

var Answer = require('../models/answer'),
    User = require('../models/user');

exports.addResponse = function(req, res){
  Answer.addResponse(req, function(err, answer){
    //console.log('answer>>>>>>>>>', answer);
    req.user.taken = req.user.taken || [];
    req.user.taken.push(req.body.surveyID);
    User.collection.save(req.user, function(err, num){
      //res.send({results:results});
      res.status(200).end();
    });
  });
};

exports.getResults = function(req, res){
  Answer.findBySurveyId(req.body.id, function(err, answer){
    var results = answer.syncScore(req.user);
    console.log(results);
    res.send(results);
    res.status(200).end();
  });
};

//exports.getResults
    //var results = answer.syncScore();


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
