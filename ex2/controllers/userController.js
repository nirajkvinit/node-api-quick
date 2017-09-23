var helper = require('../config/helperFunctions.js');

var users = {};
var max_user_id = 0;

module.exports = function(server) {
	server.get("/", function(req, res, next){
		helper.success(res, next, users);
	});

	server.get("/user/:id", function(req, res, next){
		if(typeof(users[req.params.id]) === 'undefined') {
			helper.failure(res, next, 'The specified user could not be found in the database.', 404);
		}
		helper.success(res, next, users[parseInt(req.params.id)]);
	});

	server.post("/user", function(req, res, next){
		var user = req.params;
		
		max_user_id++;
		user.id = max_user_id;
		users[user.id] = user;

		helper.success(res, next, user);
	});

	server.put("/user/:id", function(req, res, next){
		if(typeof(users[req.params.id]) === 'undefined') {
			helper.failure(res, next, 'The specified user could not be found in the database.', 404);
		}
		var user = users[parseInt(req.params.id)];
		var updates = req.params;

		for(var field in updates) {
			user[field] = updates[field];
		}
		helper.success(res, next, user);
	});

	server.del("/user/:id", function(req, res, next){
		if(typeof(users[req.params.id]) === 'undefined') {
			helper.failure(res, next, 'The specified user could not be found in the database.', 404);
		}
		delete users[parseInt(req.params.id)];
		helper.success(res, next, []);
	});
}