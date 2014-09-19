'use strict';

var Mongo = require('mongodb'),
    async = require('async');


function Question(){
}

Object.defineProperty(Question, 'collection', {
  get: function(){return global.mongodb.collection('questions');}
});

Question.create = function(question, cb){
  Question.collection.save(question,function(err, question){
    require('./survey').findById(question.surveyId, function(err, survey){
      survey.questions.push(question._id);
      require('./survey').collection.update({_id:survey._id},{$set:{questions:survey.questions}}, cb);
    });
  });
};



Question.all = function(cb){
  Question.collection.find().toArray(cb);
};

Question.findById = function(id,cb){
  console.log(id);
  var _id = Mongo.ObjectID(id);
  Question.collection.findOne({_id:_id}, function(err, obj){
    cb(err, obj);
  });
};

Question.findSurveyQuestions = function(arrayOfQuestions, cb){
  async.map(arrayOfQuestions, iterator, cb);
};



module.exports = Question;



function iterator(question, cb){
  Question.collection.findOne({_id:question}, function(err, question){
    cb(null, question);
  });
}

