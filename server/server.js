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
var BoardClass = require('./room.js');

console.dir(player);

var currentRoom = BoardClass.create();

var addPlayer = function(player) {
	console.log('numplayers', currentRoom.players.length);
	currentRoom.players[player.id] = player;
};

var gameStarted = false;

var users = io.of('/users').on('connection', function(socket){
	clientSockets[socket.id] = socket;

	var currentPlayer = player.create(socket.id);
	addPlayer(currentPlayer);

	board.emit('addPlayer', currentPlayer); 
	socket.emit('playerData', currentPlayer);

	board.emit('onlinePlayers', currentRoom.players);
	console.log('onlinePlayers:', currentRoom.players.length, currentRoom.players);

	// On Player Update, Change Board Data
	// Emit new board (maybe a interval?)

	socket.on('action', function(msg){
		console.log(msg);
	    board.emit('commands', msg, currentPlayer);
	});

	socket.on('startGame', function(msg){
		console.log('StartGame', msg);
		//if(!gameStarted){
			// TODO: 
			// emit that a single user has startet the game, so we can update other controllers
			users.emit('gameStarted', true, currentPlayer);
			board.emit('startGame', msg, currentPlayer);
			gameStarted = true;
		//}
	});

	socket.on('resetGame', function(msg){
		console.log('resetGame', msg);
	    board.emit('resetGame', msg, currentPlayer);
	});

	socket.on('dead', function(msg){
		currentPlayer.dead = true;
	});

	socket.on('disconnect', function(){
		// todo : remove player from game
		board.emit('removePlayer', currentPlayer);
		player.remove(currentPlayer);
	});
});

var board = io
	.of('/board')
	.on('connection', function (socket) {
    	var currentBoard = BoardClass.create(socket.id);
    	console.log('Board connected with ID:', currentBoard.id);
    	socket.on('gameover', function(){
    		users.emit('gameover', true);
		});
	});

var port = process.env.PORT || 3000;

http.listen(port, function(){
	console.log('listening on *:' + port);
});