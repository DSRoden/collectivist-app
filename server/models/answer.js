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
  var thisAnswer = {answers:o.body.responses, userId:o.user._id};
  console.log('o.survey ID>>>>>>>>>>>>>>', o.body.surveyID);
  console.log('o.responses>>>>>>>>>>>>>>', o.body.responses);
  Answer.findBySurveyId(o.body.surveyID.toString(), function(err, answer){
    console.log('THIS ANSWER========', thisAnswer);
    answer.responses.push(thisAnswer);
    console.log('answer>>>>>>>>>>>>>>', answer);
    var responsesLength = answer.responses.length,
        surveyId = Mongo.ObjectID(answer.surveyId);
    console.log(responsesLength);
    Answer.collection.update({surveyId:answer.surveyId}, {$set:{responses:answer.responses}}, function(){
       console.log('responsesLength>>>>>>>>>>>>>', responsesLength);
      require('./survey').collection.update({_id: surveyId}, {$set: {count: responsesLength}}, function(err, updated){
        console.log('changing the count on a survey>>>>>>>>>>', updated);
        cb(err, answer);
      });
   });
 });
};

Answer.prototype.syncScore = function(){
  //first make an array of avg responses
  //then make array of arrays of syncScores
  var numQs    = this.responses[0].answers.length,
      numUsers = this.responses.length,
      avgVals  = [],
      values   = [],
      preds    = [],
      self     = this,
      sum      = 0;
    //console.log('numQs', numQs);
    //console.log('numUsers', numUsers);


//account for userid
//responses[n].answer instead of responses[
  for(var i = 0; i < numQs; i++){
    this.responses.forEach(addSum);
    avgVals.push((sum/numUsers).toFixed(2));
    sum = 0;
  }

  function addSum(user){
    sum += parseInt(user.answers[i].value);
    //console.log('user.answers[i].value', user.answers[i].value);
  }

  //console.log('AVG VALUES ARRAY:', avgVals);
  //now we have array of avg VAls

  var syncScores = this.responses.map(function(user, index){
    user = user.answers.map(function(q){
      q = (parseInt(q.prediction) - avgVals[_.indexOf(user.answers, q)]);
      preds.push(parseInt(q.prediction));
      values.push(parseInt(q.value));
      return q.toFixed(2);
    });
    return {scores:user, userId:self.responses[index].userId};
  });

  //console.log('syncscore >>>> ', syncScores);
  return {syncScores:syncScores, avgVals:avgVals};

};


module.exports = Answer;

