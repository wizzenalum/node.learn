(function(){
    var http = require("http");
    var port = 8080;
    
    // function to handle the request and responce;
    var handleResReq = function(req,res){
        console.log(req.url);
        // write head define the about header properity of responce like type of responce code
        // type of responce file.
        res.writeHead(200,{'content-type':'text/html'});
        res.end('<h2>gotcha!</h2>')
    }
    
    // lets start server fierst.

    var server = http.createServer(handleResReq);

    // for arror detection if server wont work
    var handleError = function(err){
        if(err){
            console.log("server wont worked",err);
            return;
        }else{
           console.log("server is up and running"); 
        }
    } 
    server.listen(port,handleError)
}());