// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');

var comments = [];
var server = http.createServer(function(request, response) {
    var urlObject = url.parse(request.url);
    var method = request.method;
    if (urlObject.pathname === '/' && method === 'GET') {
        fs.readFile('./index.html', 'utf-8', function(err, data) {
            if (err) {
                response.statusCode = 404;
                response.end('Not found');
            } else {
                response.end(data);
            }
        });
    } else if (urlObject.pathname === '/comments' && method === 'GET') {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(comments));
    } else if (urlObject.pathname === '/comments' && method === 'POST') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var comment = qs.parse(body);
            comments.push(comment);
            response.end('Success');
        });
    } else {
        response.statusCode = 404;
        response.end('Not found');
    }
});

server.listen(3000, function() {
    console.log('Server is listening on 3000');
});