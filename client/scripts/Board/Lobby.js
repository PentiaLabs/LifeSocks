LifeSocks.Lobby = function(game) {};
LifeSocks.Lobby.prototype = {
	create: function() {
		this.game.state.start('Game');
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};