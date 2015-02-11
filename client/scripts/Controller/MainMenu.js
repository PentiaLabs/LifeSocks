var numPlayers = 0;

LifeSocks.MainMenu = function(game) {
	socket.on('playerCount', function (players) {   
		numPlayers = players;
	});
};

LifeSocks.MainMenu.prototype = {
	create: function() {
		var that = this;

		this.add.sprite(0, 0, 'controller-bg');

	    socket.on('gameStarted', function () {
	    	that.gameStarted();
	    });
	},
	update: function () {
		var label,
			style = { font: '65px Arial', fill: '#00000', align: 'center' },
			text;

		if (numPlayers == 1) {
			if (LifeSocks.playerData.isHost) {
				label = 'Youre the first - waiting for players';
			}else{
				label = 'The host has left... something is wrong';
			}
		}else{
			// if we have more than one player connected, and we're the host, we should be able to start the game
			if (LifeSocks.playerData.isHost) {
				this.add.sprite(200, 100, 'controller-start-header');
				this.add.button(750, 550, 'controller-start', this.startGame, this, null, null, null);
			}else{
				label = 'Waiting for host to start the game';
			}
		}

		text = this.add.text(this.world.centerX, this.world.centerY, label, style);
		text.x = this.world.width / 2 - text.width / 2;
	},
	startGame: function() {
		socket.emit('startGame', true);

		this.game.state.start('Play');
	},
	gameStarted: function() {
		this.game.state.start('Play');
	}
};