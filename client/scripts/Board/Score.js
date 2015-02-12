// these are the coordinates in which joined players will be placed
var loserSlots = [
	{ x: 1101, y: 290 },
	{ x: 1240, y: 245 },
	{ x: 1436, y: 250 },
	{ x: 1637, y: 246 },
	{ x: 1194, y: 436 },
	{ x: 1348, y: 398 },
	{ x: 1530, y: 382 },
	{ x: 1650, y: 493 },
	{ x: 1307, y: 582 },
	{ x: 1466, y: 540 },
	{ x: 1162, y: 665 },
	{ x: 1379, y: 732 },
	{ x: 1586, y: 668 },
	{ x: 1070, y: 812 },
	{ x: 1247, y: 813 },
	{ x: 1526, y: 830 }
];

LifeSocks.Score = function(game) {
	var that = this;

	board.on('resetGame', function (player) {
     	console.log('resetGame', player);
     	that.resetGame();
    });
};
LifeSocks.Score.prototype = {
	create: function() {
		var game = this;

	    this.add.sprite(0, 0, 'score-bg');

	    var semenSock = this.add.sprite(400, 100, 'semen-sock');

	    this.add.sprite(0, 0, 'score-txt');

	    semenSock.animations.add('drip', [
            'semen-sock1',
            'semen-sock2',
            'semen-sock3',
            'semen-sock4',
            'semen-sock5',
            'semen-sock6'], 6, true);

	    semenSock.animations.play('drip');

	   	this.add.text(197, 489, winner, { font: '60px Arial Black', fill: '#00000', align: 'center' });
	   	
	   	var winner = this.add.sprite(397 + 250, 388, 'semen', 'crown');
	   	var crown = this.add.sprite(397 + 250, 388, 'semen', 'ready3');

	   	winner.angle = 90;
	   	crown.angle = 90;

	    // temporarily add joined players (hardcoded for now)
	    for (var i = 0; i < loserSlots.length; i++) {
		    setTimeout(function () {
		    	game.showLoser();
		  	}, (i+1) * 1000);
		}

	    board.emit('gameover');
	},

	showLoser: function () {
		// find next unused slot
		var avatarSlot = loserSlots.shift();

		// let's select a random sprite
		var readySprite = 'ready' + (1 + Math.floor(Math.random() * (6 - 1 + 1)));

		// the '+ 250' is because the axis are getting a bit twisted when we change angle in the next line - we should look into changing this somehow
		var loser = this.add.sprite(avatarSlot.x + 250, avatarSlot.y, 'semen', readySprite);

		// and rotate...
		loser.angle = 90;
	},

	resetGame: function () {
		this.game.state.start('MainMenu');
	}
};