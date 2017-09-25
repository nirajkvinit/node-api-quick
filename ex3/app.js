var restify = require('restify');
var plugins = require('restify').plugins;
var server = restify.createServer();
var restifyValidator = require('restify-validator');
var mongoose = require('mongoose');

var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');
var config = require('./config/dbconnection.js');


mongoose.connect(config.getMongoConnection(), {
	useMongoClient: true,
});

setupController(server, plugins, restifyValidator);
userController(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});