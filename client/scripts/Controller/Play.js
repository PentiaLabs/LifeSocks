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

		var avatar = this.add.sprite(this.world.width / 2, 400, 'semen', 'ready1');
		avatar.angle = 90;
		avatar.x = this.world.width / 2 - avatar.width / 2 + avatar.width;

	    var text = LifeSocks.playerData.name;
	    var style = { font: "65px Arial", fill: "#00000", align: "center" };
	    var t = this.add.text(this.world.centerX, 600, text, style);

	    // TODO: change hardcoded color to actual player color
	    // find next badge color - and cycle through them from the beginning, when we've used them all
      var badge = this.add.sprite(0, 700, 'label-green');
      badge.x = this.world.width / 2 - badge.width / 2;

	    t.x = this.world.width / 2 - t.width / 2;
	    
	    this.add.button(this.world.width - 528 - 50, 250, 'controller-right', this.rotateRight, this, null, null, null);
	    this.add.button(50, 250, 'controller-left', this.rotateLeft, this, null, null, null);
	},
	restart: function() {
		this.game.state.start('MainMenu');
	},
	rotateRight: function () {
	    socket.emit('action', { rotateRight: 200 });
	},
	rotateLeft: function () {
	    socket.emit('action', { rotateLeft: 200 });
	}
};