// thsi is a minor project.
(function(){
    'use strict'
    const http = require('http');
    const fs = require('fs');
    const port = 8000;

    let filePath;

    let handleRequest = function(req,res){
        console.log(req.url);
        res.writeHead(200,{"content-type":"text/html"});
        let handleFile = function(err,data){
            if(err){
                console.log("there is an error during the file handline",err);
                return res.end("<h1> file reading problem</h1>");
            }return res.end(data);
        }
        switch(req.url){
            case '/':
                filePath = "./resume-project/2-resume.html";
                break;
            case '/calculator':
                filePath = "./calculator/home.html";
                break;
            case '/game':
                filePath = "./ping-pong-game/index.html"
                break;
            default:
                filePath = "./404.html"
        }
        fs.readFile(filePath,handleFile);
    }
    let server = http.createServer(handleRequest);

    let handleServer = function(error){
        if(error){
            console.log("server is not working properly");
            return;
        }
        console.log("server get up and running");
    }
    server.listen(port, handleServer);


})();