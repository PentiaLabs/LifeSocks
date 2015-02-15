var onlinePlayers = {};
var add = [];
var nicknames = [];
var badges = [];

// these are the coordinates in which joined players will be placed
var avatarSlots = [
	// first row
	{ x: 215, y: 528 },
	{ x: 404, y: 605 },
	{ x: 603, y: 587 },
	{ x: 797, y: 618 },
	{ x: 975, y: 591 },
	{ x: 1158, y: 630 },
	{ x: 1326, y: 565 },
	{ x: 1488, y: 508 },

	// second row
	{ x: 156, y: 698 },
	{ x: 286, y: 787 },
	{ x: 459, y: 776 },
	{ x: 626, y: 830 },
	{ x: 799, y: 799 },
	{ x: 1017, y: 795 },
	{ x: 1217, y: 801 },
	{ x: 1406, y: 725 }
];
var avatars;

LifeSocks.MainMenu = function() {
	var that = this;

	board.on('startGame', function (player) {
		console.log('startGame', player);
		that.startGame();
    });

	board.on('playerJoinedRoom', function (player) {
			onlinePlayers[player.id] = players;

      add.push(player.id);
      nicknames.push(player.name);
      badges.push(player.badge);
  	});

  	board.on('playerLeftRoom', function (player) {
  		delete onlinePlayers[player.id];

  		var pos = add.map(function(playerId) { 
			return playerId; 
		}).indexOf(player.id);

		add.splice(pos, 1);
		nicknames.splice(pos, 1);
		badges.splice(pos, 1);
  	});
};

LifeSocks.MainMenu.prototype = {
	create: function() {
    	this.add.sprite(0, 0, 'screen-bg');
    	this.backgroundAnimation();

    	avatars = this.add.group();

		board.emit('boardReadyToPlay');
	},

	backgroundAnimation: function () {
		var delay = 0;

		for (var i = 0; i < 10; i++)
	    {
	        var sprite = this.add.sprite(-250, -100 + (this.world.randomY), 'semen', 'semen1');
	        sprite.animations.add('move', ['semen1','semen2','semen3','semen4','semen5','semen6','semen7','semen6','semen5','semen4','semen3','semen2'], 16, true);
			sprite.animations.play('move', 18, true);

	        sprite.scale.set(this.rnd.realInRange(0.1, 0.6));
	        sprite.angle = 90;
	        sprite.alpha = this.rnd.realInRange(0.1, 0.2);

	        var speed = this.rnd.between(20000, 30000);

	        var tween = this.add.tween(sprite).to({ x: this.world.width + 250 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);
	        tween.onComplete.add(this.killSprite, this);

	        delay += 1000;
	    }
	},

	killSprite: function (sprite) {
		sprite.kill();
	},

	update: function () {
		avatars.removeChildren();

		for (var i = 0; i < add.length; i++) {
	  		this.playerJoined(i);
		}
	},

	playerJoined: function (pos) {
		// find next unused slot
		var avatarSlot = avatarSlots[pos];

		// if we've deleted the group it means we don't want avatars in it
		if (!avatars) {
			return;
		}

		// let's select a random sprite
		// TODO: select random avatar
		//var readySprite = 'ready' + (1 + Math.floor(Math.random() * (6 - 1 + 1)));
		var readySprite = 'ready1';

		// the '+ 250' is because the axis are getting a bit twisted when we change angle in the next line - we should look into changing this somehow
		var joinedPlayer = this.add.sprite(avatarSlot.x + 250, avatarSlot.y, 'semen', readySprite);

		// and rotate...
		joinedPlayer.angle = 90;

		avatars.add(joinedPlayer);
	},

	startGame: function() {
		avatars.destroy();
		
		document.querySelector('#qr').style.display = 'none';

		this.game.state.start('Game');
	}
};
