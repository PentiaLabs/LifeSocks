var leftBtn;
var rightBtn;

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

    	var badge = this.add.sprite(0, 700, LifeSocks.playerData.badge);
    	badge.x = this.world.width / 2 - badge.width / 2;

    t.x = this.world.width / 2 - t.width / 2;
    
    rightBtn = this.add.button(this.world.width - 528 - 50, 250, 'controller-right', this.rotateRight, this, null, null, null);
    rightBtn.events.onInputDown.add(function () {
		    rightBtn.isDown = true;
		});

		rightBtn.events.onInputUp.add(function () {
		    rightBtn.isDown = false;
		});

    leftBtn = this.add.button(50, 250, 'controller-left', this.rotateLeft, this, null, null, null);
    leftBtn.events.onInputDown.add(function () {
		    leftBtn.isDown = true;
		});

		leftBtn.events.onInputUp.add(function () {
		    leftBtn.isDown = false;
		});
	},
	update: function () {
		if (leftBtn.isDown) {
			this.rotateLeft();
  	}

  	if (rightBtn.isDown) {
			this.rotateRight();
  	}
	},
	restart: function() {
		this.game.state.start('MainMenu');
	},
	rotateRight: function () {
	    socket.emit('action', { rotateRight: true });
	},
	rotateLeft: function () {
	    socket.emit('action', { rotateLeft: true });
	}
};