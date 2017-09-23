var restify = require('restify');
var plugins = require('restify').plugins;
var server = restify.createServer();

var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');

setupController(server, plugins);
userController(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});