// these are the coordinates in which joined players will be placed
var avatarSlots = [
	// first row
	{ x: 215, y: 528 },
	{ x: 404, y: 605 },
	{ x: 603, y: 587 },
	{ x: 797, y: 618 },
	{ x: 975, y: 591 },
	{ x: 1158, y: 630 },
	{ x: 1326, y: 565 },
	{ x: 1488, y: 508 },

	// second row
	{ x: 156, y: 698 },
	{ x: 286, y: 787 },
	{ x: 459, y: 776 },
	{ x: 626, y: 830 },
	{ x: 799, y: 799 },
	{ x: 1017, y: 795 },
	{ x: 1217, y: 801 },
	{ x: 1406, y: 725 }
];

LifeSocks.MainMenu = function(game) {
	var that = this;

	board.on('startGame', function (player) {
     	console.log('startGame', player);
     	that.startGame();
    });
};
LifeSocks.MainMenu.prototype = {
	create: function() {
		var game = this;
		
	    // var text = "Life Socks";
	    // var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	    // var t = this.add.text(this.world.centerX-300, 0, text, style);
	    this.add.sprite(0, 0, 'screen-bg');

	    // temporarily add joined players (hardcoded for now)
	    for (var i = 0; i < avatarSlots.length; i++) {
		    setTimeout(function () {
		    	game.playerJoined();
		  	}, (i+1) * 1000);
		}

		board.emit('boardReadyToPlay');
	},

	playerJoined: function () {
		// find next unused slot
		var avatarSlot = avatarSlots.shift();

		// let's select a random sprite
		var readySprite = 'ready' + (1 + Math.floor(Math.random() * (6 - 1 + 1)));

		// the '+ 250' is because the axis are getting a bit twisted when we change angle in the next line - we should look into changing this somehow
		var joinedPlayer = this.add.sprite(avatarSlot.x + 250, avatarSlot.y, 'semen', readySprite);

		// and rotate...
		joinedPlayer.angle = 90;
	},

	startGame: function() {
		this.game.state.start('Game');
	}
};