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

function serveStatic(response, cache, absPath) {
    if(cache[absPath]){//检查文件是否缓存在内存中
        sendFile(response,absPath,cache[absPath]);//从内存中返回文件
    }else {
        fs.exists(absPath,function (exists) {//检查文件是否存在
            if(exists){
                fs.readFile(absPath,function (err, data) {//从硬盘中读取文件
                    if(err){
                        send404(response);
                    }else {
                        cache[absPath] = data;
                        sendFile(response,absPath,data);//从硬盘中读取文件并返回
                    }
                });
            }else {
                send404(response);
            }
        });
    }
}




