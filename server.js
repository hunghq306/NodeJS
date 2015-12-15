var http = require("http");
function onRequest(request, response) {
    console.log("user made a request:" + request.url);
    response.writeHead(200, {'Content-type': 'text/plain'});
    response.write("Here is some data");
    response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Server is now running...");