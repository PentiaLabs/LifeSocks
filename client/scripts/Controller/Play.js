LifeSocks.Play = function(game) {};
LifeSocks.Play.prototype = {
	create: function() {

	    var text = "Life Socks";
	    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	    var t = this.add.text(this.world.centerX-300, 0, text, style);
	    this.add.sprite(0, 0, 'controller-bg');

	    buttonRight = this.add.button(1200, 250, 'controller-right', this.rotateRight, this, null, null, null);
	    buttonLeft = this.add.button(50, 250, 'controller-left', this.rotateLeft, this, null, null, null);

	    //this.game.state.start('Game');
	},
	startGame: function() {
	  this.add.sprite(0, 0, 'screen-bg');
	},
	rotateRight: function () {
	    console.log('Right!!!');
	    socket.emit('action', { rotateRight: 200 });
	},
	rotateLeft: function () {
	    console.log('LEFT!');
	    socket.emit('action', { rotateLeft: 200 });
	}
};