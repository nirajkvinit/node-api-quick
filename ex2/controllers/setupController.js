module.exports = function(server, plugins, restifyValidator) {
	server.use(plugins.acceptParser(server.acceptable));
	server.use(plugins.bodyParser());
	server.use(plugins.queryParser());
	server.use(restifyValidator);
}


