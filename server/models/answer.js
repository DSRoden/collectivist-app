'use strict';

var  Mongo  = require('mongodb'),
     _      = require('underscore-contrib');

function Answer(){
}

Object.defineProperty(Answer, 'collection', {
  get: function(){return global.mongodb.collection('answers');}
});


// find answers by survey id
//
// syncScore

Answer.findBySurveyId = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Answer.collection.findOne({surveyId:_id}, function(err, obj){
    var answer = Object.create(Answer.prototype);
    answer = _.extend(answer, obj);
    cb(err, answer);
  });
};

Answer.addResponse = function(o, cb){
  console.log('o.survey ID>>>>>>>>>>>>>>', o.surveyID);
  console.log('o.responses>>>>>>>>>>>>>>', o.responses);
  Answer.findBySurveyId(o.surveyID.toString(), function(err, answer){
    console.log('answer>>>>>>>>>>>>>>', answer);
    answer.responses.push(o.responses);
    Answer.collection.update({surveyId:answer.surveyId}, {$set:{responses:answer.responses}}, function(){
      cb(err, answer);
    });
  });
};

Answer.prototype.syncScore = function(){
  //first make an array of avg responses
  //then make array of arrays of syncScores
  var numQs    = this.responses[0].length,
      numUsers = this.responses.length,
      avgVals  = [],
      values   = [],
      preds   = [],
      sum      = 0;

  for(var i = 0; i < numQs; i++){
    this.responses.forEach(addSum);
    avgVals.push((sum/numUsers).toFixed(2));
    sum = 0;
  }

  function addSum(user){
    sum += parseInt(user[i].value);
  }

  //now we have array of avg VAls

  var syncScores = this.responses.map(function(user){
    user = user.map(function(q){
      q = (parseInt(q.prediction) - avgVals[_.indexOf(user, q)]);
      preds.push(parseInt(q.prediction));
      values.push(parseInt(q.value));
      return q.toFixed(2);
    });
    return user;
  });

  //console.log('final >>>> ', syncScores);
  return [syncScores, avgVals];

};


module.exports = Answer;

