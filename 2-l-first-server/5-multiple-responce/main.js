(function(){
    var http = require('http');
    var port = 8000;
    var fs = require('fs');
    // console.log("at list same file is running");
    var handleRequest = function(req,res){
        // console.log("start handling request");
        console.log(req.url);
        

        //handling the files for defferent systems
        var handleFiles = function(err, data){
            if(err){
                console.log('error in file reading');
                return res.end("<h1>file reading error</h1>");
            }
            return res.end(data);
        }
        // here add return url to file system respond according to that.
        var filepath;
        // my code
        // if(req.url === '/profile') fs.readFile("./profile.html",handleFiles);
        // else fs.readFile("./404.html",handleFiles);
        switch(req.url){
            case '/':
                filepath = 'index.html';
                break;
            case '/profile':
                filepath = 'profile.html';
                break;
            default:
                filepath = '404.html';
        }
        fs.readFile(filepath,handleFiles);

    }
    
    var server = http.createServer(handleRequest);
    var handleServer = function(err){
        // console.log("get in handle server");
        if(err){
            console.log('server is not running');
            return;
        }
        console.log("server and runnig");
    }
    server.listen(port,handleServer);
   


})();