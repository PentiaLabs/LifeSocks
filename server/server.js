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
var clientSockets = {};

var player = require('./player.js');
var room = require('./room.js');

console.dir(player);

io.on('connection', function(socket){
	clientSockets[clientSocket.id] = clientSocket;

	socket.emit('welcome', {
		others : others
	});

	socket.on('newPlayer', function(player) {

		var player = player.create(clientSocket.id);
		addPlayer(player);
		clientSocket.emit('JOINED', { playerid: player.id, nickname: player.nickname });
		logDebug("Player " + player.nickname + " (" + player.id + ") joined");

		socket.broadcast.emit('changePos', {
			clientid: socket.id,
			player : others[socket.id]
		});
	});

	socket.on('disconnect', function(){
		// todo : remove player from game
		player.remove();
	});

});

http.listen(80, function(){
	console.log('listening on *:80');
});