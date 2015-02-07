LifeSocks.MainMenu = function(game) {};
LifeSocks.MainMenu.prototype = {
	create: function() {

	    var text = "Life Socks";
	    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	    var t = this.add.text(this.world.centerX-300, 0, text, style);
	    this.add.sprite(0, 0, 'screen-bg');

	    this.game.state.start('Game');

	},
	startGame: function() {
	  this.add.sprite(0, 0, 'screen-bg');
	}
};