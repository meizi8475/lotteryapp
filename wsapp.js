/**
 * Created with JetBrains WebStorm.
 * User: wangyuxin
 * Date: 12-12-24
 * Time: 下午2:02
 * 启动一个websocket的server
 */
var webSocketsServerPort = 9091;
var webSocketServer = require('websocket').server;
var http = require('http');

var mongoose = require('mongoose');
var DB_URL = "mongodb://localhost:27017/lotteryDB";
mongoose.connect(DB_URL);

var myLottery=require('./controllers/lottery');

var clients = [];

/**
 * 创建http的服务器
 */
var server = http.createServer(function(request, response) {

});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * 基于http的server创建websocket的服务器
 */
var wsServer = new webSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.');

    connection.sendUTF('连接成功');

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            var jsonObj=JSON.parse(message.utf8Data);
            if(jsonObj.operate=='start'){
                var a= myLottery.doLottery(jsonObj.user);
                for (var i=0; i < clients.length; i++) {

                }
            }else if(jsonObj.operate=='stop'){
                for (var i=0; i < clients.length; i++) {

                }
            }
        }
    });
    // 当断开连接时
    connection.on('close', function(connection) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            clients.splice(index, 1);
    });
});