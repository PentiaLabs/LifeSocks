var express = require('express');
var _ = require('underscore');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chalk = require('chalk');

// Own odules
var User = require('./user.js');
var Room = require('./room.js');
var gameServer = require('./gameServer.js');

var config = {
	port: process.env.PORT || 3000,
	clientPath: '../client'
};

var users = io.of('/users').on('connection', function(socket){
	var user = new User(socket);
	gameServer.users[user.id] = user;
	gameServer.userSockets[socket.id] = socket;

	console.log(chalk.green('User connected with ID:', user.id));

	socket.on('subscribeToBoard', function(roomName) {
		socket.join('board-' + roomName);
		console.log('Controller joined: ' + roomName);
		var game = gameServer.getRoomFromName(roomName);

		/* 
			Only join a room of one is open.
			Later it would be nice if we just created a room.
		*/
		if(game) {
			user.joinRoom(game);
		} else {
			console.log('Room not avaiable');
		}

		socket.emit('playerData', user.getUserData());
	});

	socket.on('action', function(msg){
		console.log(msg);
		board.emit('commands', msg, user.getUserData());
	});

	socket.on('startGame', function(msg){
		if(!user.room) {
			return false;
		}
		console.log('StartGame', msg, user.id, user.room.gamesStarted);
		// TODO: 
		// emit that a single user has startet the game, so we can update other controllers
		if(!user.room.gameStarted) {
			console.log('Players in room', user.room.getMembers());

			user.room.messagePlayers('gameStarted', true);
			users.emit('gameStarted', true);
			board.emit('startGame', msg);

			user.room.gameStarted = true;
		}
	});

	socket.on('disconnect', function(){
		user.delete();
	});
});

var board = io
	.of('/board')
	.on('connection', function (socket) {
		// Find room ID
		console.log('ROOMS: ',gameServer.getRooms());
		//console.log("query... ", socket.request);

		socket.on('subscribeToBoard', function(roomName) {
			socket.join('board-' + roomName);

			var room = gameServer.getRoomFromName(roomName);
			console.log('doesROOMEXIST`?', room);
			/*
				If room does not exsist, create it.
			*/
			if(!room) {
				room = gameServer.createRoom(socket, roomName);
				room.messagePlayers('roomCreated', room.id);
			}

			console.log(chalk.green('Board connected with ID:', room.id, room._socketId));

			socket.on('killPlayer', function (userId) {
				gameServer.users[userId].playerKilled();
			});

			socket.on('gameover', function(){
				room.messagePlayers('gameover', true);
				room.reset();
			});

			socket.on('reset', function(){
				room.removeAllMembers();
				room.gameStarted = false;
			});

			socket.on('disconnect', function(){
				console.log(chalk.red('The board ' + socket.id + ' disconnects'));
				room.reset();
			});
		});
	});

app.get('/:game', function(req, res){
	res.sendFile(path.join(__dirname + '/../client/controller.html'));
});

app.get('/board/:game', function(req, res){
	res.sendFile(path.join(__dirname + '/../client/board.html'));
});

app.use(express.static(path.join(__dirname, config.clientPath)));

http.listen(config.port, function(){
	console.log('listening on *:' + config.port);
});
