var numPlayers = 0;

var spritePlayerOne;
var spriteWaiting;
var startButton;

LifeSocks.MainMenu = function(game) {
	socket.on('playerCount', function (players) {   
		numPlayers = players;
	});
};

LifeSocks.MainMenu.prototype = {
	create: function() {
		var that = this;

		this.add.sprite(0, 0, 'controller-bg');

		// so add graphics that we can show or hide later
		spritePlayerOne = this.add.sprite(200, 100, 'controller-start-header');
		spriteWaiting = this.add.sprite(this.world.centerX, this.world.centerY, 'waiting', 'waiting1');
		spriteWaiting.scale.setTo(0.75,0.75);
		spriteWaiting.y = this.world.centerY;
		spriteWaiting.x = this.world.centerX - spriteWaiting.width / 2;

		spriteWaiting.animations.add('ticking', ['waiting1','waiting2','waiting3']);
		spriteWaiting.animations.play('ticking', 1, true);

		startButton = this.add.button(750, 550, 'controller-start', this.startGame, this, null, null, null);

	    socket.on('gameStarted', function () {
	    	that.gameStarted();
	    });
	},
	update: function () {
		var label,
			style = { font: '65px Arial', fill: '#00000', align: 'center' },
			text;

		spritePlayerOne.visible = false;
		spriteWaiting.visible = false;
		startButton.visible = false;

		if (numPlayers == 1) {
			if (LifeSocks.playerData.isHost) {
				spritePlayerOne.visible = true;
				spriteWaiting.visible = true;
			}else{
				label = 'The host has left... something is wrong';
			}
		}else{
			// if we have more than one player connected, and we're the host, we should be able to start the game
			if (LifeSocks.playerData.isHost) {
				spritePlayerOne.visible = true;
				startButton.visible = true;
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