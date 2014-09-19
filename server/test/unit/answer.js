/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Answer    = require('../../models/answer'),
    dbConnect = require('../../lib/mongodb'),
    cp        = require('child_process'),
    db        = 'collectivist';

describe('Answer', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      console.log(stdout, stderr);
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Answer object', function(){
      var a = new Answer();
      expect(a).to.be.instanceof(Answer);
    });
  });
  describe('.findBySurveyId', function(){
    it('should return an answer based on survey Id', function(done){
      var id = 'f00000000000000000000003';
      Answer.findBySurveyId(id, function(err, answer){
        expect(answer).to.be.ok;
        expect(answer.responses).to.have.length(3);
        expect(answer).to.be.instanceof(Answer);
        done();
      });
    });
  });
  describe('.syncScore', function(){
    it('should return and array of arrays with synscore', function(done){
      var id = 'f00000000000000000000003';
      Answer.findBySurveyId(id, function(err, answer){
        var results = answer.syncScore();
        console.log('SS', results.syncScores);
        expect(results.syncScores).to.have.length(3);
        expect(results.syncScores[0]).to.have.length(5);
        expect(results.syncScores[0][0]).to.be.closeTo(1.33, 0.01);
        expect(results.syncScores[1][1]).to.be.closeTo(-0.66, 0.02);
        done();
      });
    });
  });
});

