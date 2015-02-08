LifeSocks.MainMenu = function(game) {};
LifeSocks.MainMenu.prototype = {
	create: function() {

	    var text = "Life Socks";
	    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	    var t = this.add.text(this.world.centerX-300, 0, text, style);
	    this.add.sprite(0, 0, 'screen-bg');


	    // We need a start button... but We'll fake this :-)
	    var that = this;
	    setTimeout(function() {
	    	that.game.state.start('Game');
	    }, 3000);

	},
	startGame: function() {
	  this.add.sprite(0, 0, 'screen-bg');
	}
};