var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.spritesheet('dude', '../assets/dude.png', 32, 48);
}

var player;
var cursors;
var dudes;

var others = {};
var otherSprites;

var socket = io();

function create() {
	//  We're going to be using physics, so enable the Arcade Physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	player = game.add.sprite(32, game.world.height - 150, 'dude');

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  //  Our bullet group
  otherSprites = game.add.group();
  otherSprites.enableBody = true;
  otherSprites.physicsBodyType = Phaser.Physics.ARCADE;
  otherSprites.createMultiple(30, 'dude');
  
  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();

	// new player       
  var pos = {
      x: game.world.centerX,
      y: game.world.centerY
  };

  document.getElementById('me').innerHTML = socket.io.engine.id;

 	socket.emit('newPlayer', pos);

  socket.on('changePos', function (details) {
		if (details.clientid && !others[details.clientid]) {
			addRemoteClient(details.clientid, details.player.x, details.player.y);
		}else{
  	 	others[details.clientid].x = details.player.x;
	  	others[details.clientid].y = details.player.y;
	  }
  });

  socket.on('removePlayer', function(clientid) {
  	delete others[clientid];

  	removeRemoteClient(clientid);
  });
};

function update() {
	for (other in others) {
		others[other].sprite.x = others[other].x;
		others[other].sprite.y = others[other].y;
	}

	//  Reset the players velocity (movement)
  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    //  Move to the left
    player.body.velocity.x = -150;

    player.animations.play('left');
  }
  else if (cursors.right.isDown) {
    //  Move to the right
    player.body.velocity.x = 150;

    player.animations.play('right');
  }
  else {
	  //  Stand still
	  player.animations.stop();

	  player.frame = 4;
  }
  
  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -350;
  }

  // new player pos   
  var pos = { 
      x: player.position.x,
      y: player.position.y
  };

	socket.emit('newPlayer', pos);
};

var addRemoteClient = function (clientid, x, y) {
	var other = otherSprites.getFirstExists(false);

	other.reset(x, y);

	//  We need to enable physics on the player
  game.physics.arcade.enable(other);

  //  Player physics properties. Give the little guy a slight bounce.
  other.body.bounce.y = 0.2;
  other.body.gravity.y = 300;
  other.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  other.animations.add('left', [0, 1, 2, 3], 10, true);
  other.animations.add('right', [5, 6, 7, 8], 10, true);

	others[clientid] = {
		sprite: other,
		x: x,
		y: y
	};
};

var removeRemoteClient = function (clientid) {
	others[clientid].other.kill();
};