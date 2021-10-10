const http = require('http');// here i import http module
const port = 8000; // generaly one port run one service.
const server = http.createServer();
server.listen(port,function(err){ // if listen start service on port or not then function will run.
    if(err){
        console.log("err in the server creation");
    }
    else{
        console.log("Server is up and running on port:",port);
    }
})

