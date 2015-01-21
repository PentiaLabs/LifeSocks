var express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/../client/multi.html'));
});

app.use(express.static(path.join(__dirname, '/../client'))); //  "public" off of current is root

// Count how many are online
var sockets = {};
var others = {};

io.on('connection', function(socket){
	socket.emit('welcome', {
		others : others
	});

	socket.on('newPlayer', function(player) {
		others[socket.id] = player;
		others[socket.id].clientid = socket.id;

		socket.broadcast.emit('changePos', {
			clientid: socket.id,
			player : others[socket.id]
		});
	});

	socket.on('disconnect', function(){
		// todo : remove player from game
	});

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});