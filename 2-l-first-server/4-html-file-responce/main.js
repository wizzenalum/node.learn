(function(){
    var http = require('http');
    var fs = require('fs');
    var port = 8080;
    
    var handleRequest = function(req,res){
        console.log(req.url);
        res.writeHead(200,{"content-type":"text/html"});

        // file reading call back funciton
        var handleFile = function(err,data){
            if(err){
                console.log("error in file reading");
                console.log(data);
                return res.end("<h1>error is found reading file</h1>");
            }
            return res.end(data);
        }
        // here i am reading file to collect its data 
        fs.readFile('./index.html',handleFile);
    }


    var server = http.createServer(handleRequest);
    var handleServer = function(err){
        if(err){
            console.log("server is not runnning");
            return;
        }else console.log("server running");
    }
    server.listen(port,handleServer);
}())