'use strict';

var Survey = require('../models/survey');

exports.index = function(req, res){
  Survey.all(req.user, function(err, surveys){
    //console.log('req.user>>>>>', req.user);
    //console.log(surveys);
    res.send({surveys:surveys});
  });
};

exports.fetchSurvey = function(req, res){
  Survey.getSurveyWithQuestions(req.body, function(err, survey, questions){
    console.log(survey);
    console.log(questions);
    res.send({survey:survey, questions:questions});
  });
};

exports.fetchTaken = function(req, res){
  Survey.allTaken(req.user, function(err, surveys){
    console.log(surveys);
    res.send({surveys:surveys});
  });
};


//exports.create = function(req, res){
  //Survey.create(req.body, function(err, survey){
    //res.send({survey:survey});
  //});
//};

//exports.all = function(req, res){
  //Survey.all(function(err, surveys){
    //res.send({surveys:surveys});
  //});
//};
