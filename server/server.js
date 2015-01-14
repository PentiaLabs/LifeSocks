var express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.use(express.static(path.resolve(__dirname, '/../client'))); //  "public" off of current is root

// Count how many are online
var connectedCount = 0;
io.on("connection", function(s){ 
	connectedCount += 1;
	console.log('a user connected');
	io.emit('connectedCount', connectedCount);
	s.on("disconnect", function(){
		connectedCount -= 1;
		io.emit('connectedCount', connectedCount);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});