module.exports = function(server, plugins, restifyValidator) {
	server.use(plugins.acceptParser(server.acceptable));
	server.use(plugins.bodyParser());
	server.use(plugins.queryParser());
	server.use(plugins.authorizationParser());
	server.use(restifyValidator);

	server.use(function(req, res, next) {
		var whitelistedIPs = ['111.222.333.444'];
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		if(whitelistedIPs.indexOf(ip) === -1) {
			var response = {
				'status': 'failure',
				'data': 'Invalid IP Address.'
			};
			res.setHeader('content-type', 'application/json');
			res.writeHead(403);
			res.end(JSON.stringify(response));
		}
		//return next();
	});

	server.use(function(req, res, next) {
		var apiKeys = {
			'user1': 'kjkjh5KJHv694JG745f667jfRR'
		};
		if(typeof(req.authorization.basic) === 'undefined' || !apiKeys[req.authorization.basic.username] || req.authorization.basic.password !== apiKeys[req.authorization.basic.username]) {
			var response = {
				'status': 'failure',
				'data': 'You must specify a valid API key.'
			};
			res.setHeader('content-type', 'application/json');
			res.writeHead(403);
			res.end(JSON.stringify(response));
			//return next();
		} else {
			return next();	
		}
	});

	server.use(plugins.throttle({
		rate: 1,
		burst: 2,
		xff: true;
	}));
}