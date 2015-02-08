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
 		button.onInputOver.add(this.over, this);
	    button.onInputOut.add(this.out, this);
	    button.onInputUp.add(this.up, this);

	    //this.game.state.start('Game');
	},
	startGame: function() {
	  this.add.sprite(0, 0, 'screen-bg');
	},
	 up: function() {
	    console.log('button up', arguments);
	},
	over: function() {
	    console.log('button over');
	},
	out: function () {
	    console.log('button out');
	},
	actionOnClick: function () {
	    console.log('VILDT!!!');
	}
};