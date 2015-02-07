LifeSocks.MainMenu = function(game) {};
LifeSocks.MainMenu.prototype = {
	create: function() {
		this.startButton = this.add.button(400, 400, 'button-start', this.startGame, this, 2, 1, 0);
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};