'use strict';

var express = require('express'),
	w       = require('./logging')
;

// Log levels { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

var app = express();

app.get('/', function(req, res) {
	res.send('hello');
});

var server = app.listen( 8080, function() {
	
	w.info(
		'Listening at http://%s:%s',
		server.address().address,
		server.address().port
	);
	
});