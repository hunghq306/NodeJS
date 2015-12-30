var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.sendfile('test/html.html');
});

app.get('/html2', function(req, res) {
    res.sendfile('test/html2.html');
});

app.get('/html3', function(req, res) {
    res.send('this is html3');
});

app.get('/pdf1.pdf', function(req, res) {
    res.sendfile('test/pdf1.pdf');
});

app.get('/pdf2.pdf', function(req, res) {
    res.sendfile('test/pdf2.pdf');
});

app.listen(8888);
console.log('Server started! At http://localhost:');