/*var http = require('http');

http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, world!');
    
}).listen(process.env.PORT || 8080);*/


var app = require('http').createServer(handler),
    fs = require('fs'),
    events = require('events');

app.listen(process.env.PORT || 8080);

/*app.on('connection', function(stream) {
    console.log('someone connected!');
});*/

function handler (req, res) {
    console.log('connected:', new Date());
    console.log(req.url);
    if(req.mehod == "post"){
        console.log('post');    
    }
    if(req.url && (new RegExp(/^[a-zA-Z0-9_\\/\-]+\.js\.logs\/\d+\.txt$/gi).test(req.url))) {
        console.log('url match');
        fs.readFile(__dirname + req.url,
            function(err, data) {
                if(err) {
                    res.writeHead(500);
                    console.log(err);
                    console.log(data);
                    return res.end('Error loading index.html');
                }
                res.writeHead(200);
                res.end(data);
           });
    } else {
        fs.readFile(__dirname + '/public/index.html',
        function(err, data) {
            if(err) {
                res.writeHead(500);
                console.log(err);
                console.log(data);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
    }
}
