LifeSocks.Play = function(game) {
	var that = this;

	controller.on('gameover', function () {
     	console.log('gameover');
     	that.restart();
    });
};
LifeSocks.Play.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'controller-bg');

	    var text = LifeSocks.playerData.name;
	    var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
	    var t = this.add.text(this.world.centerX, 600, text, style);
	    
	    this.add.button(1200, 250, 'controller-right', this.rotateRight, this, null, null, null);
	    this.add.button(50, 250, 'controller-left', this.rotateLeft, this, null, null, null);
	},
	restart: function() {
		this.game.state.start('MainMenu');
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