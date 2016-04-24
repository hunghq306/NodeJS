var express = require('express'),
    server = express(),
    events = require('events'),
    eventEmitter = new events.EventEmitter(),    
    Dropbox = require("dropbox"),

    options = {
      key: '7zdgjf3ykqtofs6',
      secret: '5qlpu9me6ad2q6r'
    };

server.get('/auth', function (request, response) { // response json => REST
  var dbClient = new Dropbox.Client(options);
  dbClient.authDriver({  
    authType: function() {return "code"},
    
    // Make sure you've registered the url below with Dropbox
    // as an OAUTH Redirect URI. Dropbox calls this once the user has agreed
    url: function() {return "http://localhost:8080/auth/callback"},
    doAuthorize: function(authUrl, stateParam, dbClient, callback) {
      response.redirect(authUrl);
      eventEmitter.once('auth_completed', function(state, code){
        if (state === stateParam) {return callback({code: code})}
      });    
    },
    oauthQueryParams: ['access_token', 'expires_in', 'scope', 'token_type', 'code', 'error', 'error_description', 'error_uri', 'mac_key', 'mac_algorithm'].sort()
  });

  dbClient.authenticate(function(error, client) {
    
    if (error) {return console.log(error)}
	console.log("===== Authenticated");
	console.log("=====tokennn:" + client._oauth._token);

		/*
	  client.writeFile("test.txt", "sometext", function (error, stat) {
		if (error) {
		  console.log(error);
		  return;
		}
		console.log("file saveddd!");
		console.log(stat);
	  });
	  */
	
  });
 
});
 
server.get('/auth/callback', function(req, res){
  
  var code = req.query.code,
      state = req.query.state;
  eventEmitter.emit('auth_completed', state, code);
 
});
 
server.listen(8080);