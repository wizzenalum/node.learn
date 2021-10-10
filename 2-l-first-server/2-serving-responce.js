const http = require('http');// here i import http module
const port = 8000; // generaly one port run one service.

var requestHandler = function(request,responce){
    console.log(request.url);
    responce.end("gotcha")
}

const server = http.createServer(requestHandler);
server.listen(port,function(err){ // if listen start service on port or not then function will run.
    if(err){
        console.log("err in the server creation");
        return;
    }
    else{
        console.log("Server is up and running on port:",port);
    }
})
