var numPlayers = 0;

var spritePlayerOne;
var spriteWaiting;
var startButton;

LifeSocks.MainMenu = function() {
	socket.on('playerCount', function (players) {   
		numPlayers = players;
	});
};

LifeSocks.MainMenu.prototype = {
	create: function() {
		var that = this;

		this.add.sprite(0, 0, 'controller-bg');

		// so add graphics that we can show or hide later
		spritePlayerOne = this.add.sprite(this.world.centerX, 100, 'header-first-player');
		spritePlayerOne.x = this.world.centerX - spritePlayerOne.width / 2;

		spriteAreYouReady = this.add.sprite(200, 100, 'header-are-you-ready');
		spriteAreYouReady.x = this.world.centerX - spriteAreYouReady.width / 2;

		spriteWaiting = this.add.sprite(this.world.centerX, this.world.centerY, 'text-waiting', 'waiting1');
		spriteWaiting.scale.setTo(0.75,0.75);
		spriteWaiting.y = this.world.centerY;
		spriteWaiting.x = this.world.centerX - spriteWaiting.width / 2;

		spriteWaiting.animations.add('ticking', ['waiting1','waiting2','waiting3']);
		spriteWaiting.animations.play('ticking', 1, true);

		startButton = this.add.button(750, 550, 'controller-start-button', this.startGame, this, null, null, null);

    socket.on('gameStarted', function () {
    	that.gameStarted();
    });
	},
	update: function () {
		spritePlayerOne.visible = false;
		spriteWaiting.visible = false;
		startButton.visible = false;
		spriteAreYouReady.visible = false;
		
		// if there's only one player, he's the host and he's waiting
		if (numPlayers === 1) {
			spritePlayerOne.visible = true;
			spriteWaiting.visible = true;
		} else {
			// if we have more than one player connected, and we're the host, we should be able to start the game
			if (LifeSocks.playerData.isHost) {
				spritePlayerOne.visible = true;
				startButton.visible = true;
			} else {
				spriteAreYouReady.visible = true;
				spriteWaiting.visible = true; // <- TODO: should be a 'waiting for host to start the game...' animation
			}
		}
	},
	startGame: function() {
		socket.emit('startGame', true);

		this.game.state.start('Play');
	},
	gameStarted: function() {
		this.game.state.start('Play');
	}
};
