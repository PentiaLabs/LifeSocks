LifeSocks.MainMenu = function(game) {};
LifeSocks.MainMenu.prototype = {
	create: function() {

	    var text = "Life Socks";
	    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	    var t = this.add.text(this.world.centerX-300, 0, text, style);
	    this.add.sprite(0, 0, 'controller-bg');

	    this.add.sprite(50, 250, 'controller-left');
	    //this.add.sprite(1200, 250, 'controller-right');

	    button = this.add.button(1200, 250, 'controller-right', this.actionOnClick, this, 2, 1, 0);


	    //this.game.state.start('Game');
	},
	startGame: function() {
	  this.add.sprite(0, 0, 'screen-bg');
	},
	actionOnClick: function () {
	    console.log('VILDT!!!');
	}
};