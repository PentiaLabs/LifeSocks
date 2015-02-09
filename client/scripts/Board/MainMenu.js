// these are the coordinates in which joined players will be placed
var joinSlots = [
	{ x: 215,
		y: 528 },
	{ x: 404,
		y: 605 },
	{ x: 603,
		y: 587 },
	{ x: 797,
		y: 618 },
	{ x: 975,
		y: 591 },
	{ x: 1158,
		y: 630 },
	{ x: 1326,
		y: 565 }
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

    // var text = "Life Socks";
    // var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

    // var t = this.add.text(this.world.centerX-300, 0, text, style);
    this.add.sprite(0, 0, 'screen-bg');

    var game = this;

    // temporarily add joined players (hardcoded for now)
    for (var i = 0; i < joinSlots.length; i++) {
	    setTimeout(function () {
	    	game.playerJoined();
	  	}, (i+1) * 1000);
	  }

		board.emit('boardReadyToPlay');
	},

	playerJoined: function () {
		var joinSlot = joinSlots.shift();
		var readySprite = 'ready' + (1 + Math.floor(Math.random() * (6 - 1 + 1)));

		// the 250 is because the axis are getting a bit twisted when we change angle in a second - we should look into changing this somehow
		var joinedPlayer = this.add.sprite(joinSlot.x + 250, joinSlot.y, 'semen', readySprite);
		joinedPlayer.angle = 90;
	},

	startGame: function() {
		this.game.state.start('Game');
	}
};