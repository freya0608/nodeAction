/**
 * Created by freya on 2017/5/4.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require("mime");
var cache = {};

function send404(response) {
    response.writeHead(404,{'Content-Type':'text/file'});
    response.write('Error 404:resource not found');
    response.end();
}
function sendFile(response,filePath,fileContents) {
    response.writeHead(
        200,{'Content-Type':mine.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}