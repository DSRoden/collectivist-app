'use strict';

var Mongo = require('mongodb');
    //async = require('async'),
    //_     = require('underscore-contrib');


function Survey(){
}

Object.defineProperty(Survey, 'collection', {
  get: function(){return global.mongodb.collection('surveys');}
});

Survey.create = function(o, cb){
  Survey.collection.save(o, cb);
};

Survey.allTaken = function(user, cb){
  var results = [];
  Survey.collection.find().toArray(function(err, surveys){
    user.taken.forEach(function(survey){
      for(var i = 0; i<surveys.length; i++){
        if(surveys[i]._id.toString() === survey){
          results.push(surveys[i]);
        }
      }
    });
    cb(null, results);
  });
};

Survey.all = function(user, cb){
  var results = [];
  Survey.collection.find().toArray(function(err, surveys){
    if(user.taken){
      user.taken.forEach(function(survey){
        for(var i = 0; i<surveys.length; i++){
          if(surveys[i]._id.toString() !== survey){
            results.push(surveys[i]);
          }
        }
      });
      cb(null, results);
    }else{
      cb(null, surveys);
    }
  });
};

Survey.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Survey.collection.findOne({_id:_id}, function(err, obj){
    cb(null, obj);
  });
};

Survey.getSurveyWithQuestions = function(id, cb){
  console.log(id);
  var _id = Mongo.ObjectID(id.id);
  Survey.collection.findOne({_id:_id}, function(err, survey){
    require('./question').findSurveyQuestions(survey.questions, function(err, questions){
      cb(null, survey, questions);
    });
  });
};


module.exports = Survey;

// private functions
/*
function iterator(survey, cb){
  console.log('inside iterator1, survey >>>>>>>', survey);
  var surveyId = survey._id.toString();
  console.log('inside iterator1, surveyId >>>>>>>', surveyId);
  return surveyId;
}

function iterator2(notTakenId, cb){
  var _id = Mongo.ObjectID(notTakenId);
  Survey.collection.findOne({_id:_id}, function(err, survey){
  cb(null, survey);
  });
}
*/
