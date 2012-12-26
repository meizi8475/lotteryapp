
/**
 * app.js  主文件 启动文件
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();
require('./config')(express, app);
routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
