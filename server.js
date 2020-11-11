var os = require('os');
var module = require('./get_prime');
  

var http = require('http');
var url = require('url');
var querystring = require('querystring');


var www = http.createServer(function(request, response){
    console.log("["+Date(Date.now()).toLocaleString()+"] "+os.hostname());
    
    var parsedUrl = url.parse(request.url);
    var parsedQuery = querystring.parse(parsedUrl.query, '&', '=');
    var input = parsedQuery.input;
    var prime = module.get_prime(input);

    console.log("input = %s" , input);
    console.log('prime = %s', prime);

    response.writeHead(200);
    response.end('Largest Prime Factor = ' + prime);
});

www.listen(8080, function(){
    console.log('server is running...')
});