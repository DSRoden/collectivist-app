'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    home           = require('../controllers/home'),
    surveys        = require('../controllers/surveys'),
    //questions      = require('../controllers/questions'),
    results        = require('../controllers/results'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(security.authenticate);
  app.use(debug.info);

  app.get('/home', home.index);
  app.post('/register', users.register);
  app.post('/login', users.login);
  app.delete('/logout', users.logout);

  app.use(security.bounce);
  app.get('/user', users.user);
  app.get('/surveys', surveys.index);
  app.post('/survey', surveys.fetchSurvey);
  app.post('/results', results.addResponse);

  app.post('/getresults', results.getResults);
  //app.post('/questions', questions.create);
  //app.get('/questions', questions.all);
  //app.post('/makenewsurvey', surveys.create);
  //app.get('/getnewsurveys', surveys.all);



  console.log('Express: Routes Loaded');
};

