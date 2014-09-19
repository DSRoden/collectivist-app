'use strict';

var Answer = require('../models/answer');

exports.addResponse = function(req, res){
  Answer.addResponse(req.body, function(err, answer){
    //console.log('answer>>>>>>>>>', answer);
    var results = answer.syncScore();
    //console.log('results>>>>>>>>', results);
    res.send({results:results});
  });
};

exports.getResults = function(req,res){
  Answer.findBySurveyId(req.params.surveyID, function(err, answer){
    var results = answer.syncScore();
    res.send({results:results});
  });
};

exports.all = function(req, res){
  Answer.all(function(err, answers){
    res.send({answers:answers});
  });
};
