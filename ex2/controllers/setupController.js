module.exports = function(server, plugins) {
	server.use(plugins.acceptParser(server.acceptable));
	server.use(plugins.bodyParser());
	server.use(plugins.queryParser());
}


