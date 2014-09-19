'use strict';

var Question = require('../models/question');

exports.create = function(req, res){
  Question.create(req.body, function(err, question){
    res.send({question:question});
  });
};

exports.all = function(req, res){
  Question.all(function(err, questions){
    res.send({questions:questions});
  });
};
