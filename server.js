/*var http = require('http');

http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, world!');
    
}).listen(process.env.PORT || 8080);*/
/*

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    events = require('events'),
    multipart = require('multipart'),
    stream = require('stream'),
    util = require('util'),
    app = http.createServer(handler);

app.listen(process.env.PORT || 8080);

function upload_file(req, res) {
  console.log(req);
  //req.setBodyEncoding('binary');
  
  stream.addListener('part', function(part) {
    part.addListener('body', function(chunk) {
      var progress = (stream.bytesReceived / stream.bytesTotal * 100).toFixed(2);
      var mb = (stream.bytesTotal / 1024 / 1024).toFixed(1);

      sys.print("Uploading "+mb+"mb ("+progress+"%)\015");

      // chunk could be appended to a file if the uploaded file needs to be saved
    });
  });
  stream.addListener('complete', function() {
    res.sendHeader(200, {'Content-Type': 'text/plain'});
    res.sendBody('Thanks for playing!');
    res.finish();
    sys.puts("\n=> Done");
  });
}
/*



function handler (req, res) {
    var request = url.parse(req.url);
    console.log('pathname: ', request);
    util.log(req.method.toLowerCase());
    
    if(request.pathname == "/upload" && req.method.toLowerCase() == "post"){
        upload_file(req, res);
    }else{
        console.log('connected:', new Date());
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
    console.log('___________');
}*/


// based on http://debuggable.com/posts/streaming-file-uploads-with-node-js:4ac094b2-b6c8-4a7f-bd07-28accbdd56cb

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    events = require('events'),
   multipart = require("./multipart_old"),
    stream = require('stream'),
    sys = require("util"),
    app = http.createServer(handler);

app.listen(process.env.PORT || 8080);


var name, filename, file;

function handler (req, res) {
    var request = url.parse(req.url);
    //console.log('pathname: ', request);
    //sys.log(req.method.toLowerCase());
    
    if(request.pathname == "/upload" && req.method.toLowerCase() == "post"){
        upload_file(req, res);
    }else{
        //console.log('connected:', new Date());
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

function display_form(request, response) {
  console.log('request');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(
    '<form action="/upload" method="POST" enctype="multipart/form-data">' +
    '<input type="file" name="upload-file">' +
    '<input type="submit" value="Upload">' +
    '</form>'
  );
  response.end();
}

function upload_file(request, response) {
  request.setEncoding('binary');

  var stream = new multipart.Stream(request);

  console.log(stream);

  stream.addListener('partBegin', function(part) {
      console.log('partBegin');
      sys.debug(sys.inspect(part));
      name = part.name;
      filename = part.filename;
      console.log(filename);
      file = fs.createWriteStream("./upload/" + filename);
      console.log(file);
  });

  stream.addListener('body', function(chunk) {
      console.log('body');
      file.write(chunk, function(err, bytesWritten) {
          sys.debug('bytes written: ' + bytesWritten);
      });
  });

  stream.addListener('partEnd', function(part) {
      //console.log(part);
      response.write('\n writting file part');
      if(file) file.end();
  });

  stream.addListener('complete', function() {
    sys.debug('complete');
    response.write('\n Complete!');
    response.end();
    return;
  });

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('\n Thanks for the upload');

}