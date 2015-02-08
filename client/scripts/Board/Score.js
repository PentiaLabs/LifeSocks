LifeSocks.Score = function(game) {
	var that = this;

	board.on('resetGame', function (player) {
     	console.log('resetGame', player);
     	that.resetGame();
    });
};
LifeSocks.Score.prototype = {
	create: function() {
	    var text = "Somebody";
	    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	    var t = this.add.text(this.world.centerX-300, 0, text, style);
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

	    board.emit('gameover');
	},
	resetGame: function () {
		this.game.state.start('MainMenu');
	}
};