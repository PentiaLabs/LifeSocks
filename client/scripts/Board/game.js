// Move game logic here...
var image;
var balls;
var speed = 200;
var dangerZone;
var players = {};
var add = [];
var ground;
var ballsCollisionGroup;
var groundCollisionGroup;
var decidedGame = false;

LifeSocks.Game = function(game) {
    // Viewport logic
    var board = io.connect(document.location.origin + '/board');
    board.on('commands', function (command, player) {
        console.log('Recive:', command);
        $('#log').append(JSON.stringify(command) + '- by ' + player.nickname + '<br />');

        if (command.rotateLeft) {
            players[player.id].left = true;
        };

        if (command.rotateRight) {
            players[player.id].right = true;
        };

    });
    board.on('onlinePlayers', function (onlineNumber) {
        console.log(onlineNumber);
    });

    board.on('addPlayer', function (player) {
        console.log('Player joined:', player);
        add.push(player.id);

    });

    board.on('removePlayer', function (clientid) {
        //delete others[clientid];
        //removeRemoteClient(clientid);
    });
};

LifeSocks.Game.prototype = {
    create: function () {
        this.stage.backgroundColor = '#000000';
        this.add.sprite(0, 0, 'game-bg');

        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.setBoundsToWorld(true, true, true, true, false);
        this.physics.p2.restitution = 0.6;
        this.physics.p2.setImpactEvents(true);
        ballsCollisionGroup = this.physics.p2.createCollisionGroup();
        groundCollisionGroup = this.physics.p2.createCollisionGroup();
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.add.group();
        platforms.enableBody = true;
        platforms.physicsBodyType = Phaser.Physics.P2JS;

        ground = platforms.create(0, this.world.height - 50, 'borderLong');
        ground.body.width = this.world.width;
        this.physics.p2.enable(ground);
        ground.body.height = 50;
        ground.scale.setTo(4, 4);
        ground.body.immovable = true;
        ground.body.collideWorldBounds = true;
        ground.body.setCollisionGroup(groundCollisionGroup);
        ground.body.collides(ballsCollisionGroup, this.semenSplat, this);


        balls = this.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.P2JS;

        this.physics.p2.enable(balls);
        

      //this.physics.ninja.enable(balls);
      //balls.enableBody = true;

      // The player and its settings

    },
    update : function() {
       
        //this.physics.arcade.collide(balls);
        //this.physics.arcade.overlap(balls, ground, this.semenSplat, null, this);

        for (var i = 0; i < add.length; i++) {
            var newPlayer = balls.create(this.randomRange(1200, 10), this.randomRange(768, 10), 'semen', 'semen1');
            newPlayer.animations.add('move', [
                'semen1',
                'semen2',
                'semen3',
                'semen4',
                'semen5',
                'semen6',
                'semen7',
                'semen6',
                'semen5',
                'semen4',
                'semen3',
                'semen2'], 18, true);

            newPlayer.animations.add('splat', [
                'splat1',
                'splat2',
                'splat3'], 18, false);

            this.physics.p2.enable(newPlayer);
            newPlayer.enableBody = true;
      
          //newPlayer.body.bounce.setTo(0.8, 0.8);
            newPlayer.body.setCollisionGroup(ballsCollisionGroup);
            newPlayer.body.collides(groundCollisionGroup);
            ground.body.collides(newPlayer);
            newPlayer.body.collideWorldBounds = true;
            newPlayer.anchor.setTo(0.5, 0.5);
            newPlayer.animations.play('move', 18, true);
            //newPlayer.body.width = 100;
            //newPlayer.body.height = 100;
          newPlayer.body.setCircle(30);
            
            players[add[i]] = newPlayer;
        }

        add = [];

        for (player in players) {
            if (players[player].left) {
              //players[player].angle -= 20;
              players[player].body.angle -= 20;
                players[player].left = false;
            } else if (players[player].right) {
              //players[player].angle += 20;
              players[player].body.angle += 20;
              players[player].right = false;
            } else {
              players[player].body.setZeroRotation();
            }

            
              players[player].body.thrust(400);
            //this.physics.arcade.velocityFromRotation(players[player].rotation, -speed, players[player].body.velocity);
        }

        // count alive players
        var alivePlayers = 0;
        for (var i = 0; i < balls.children.length; i++) {
            if (balls.children[i].alive) {
                alivePlayers = alivePlayers + 1;
            }
        }

        // if it's the last man standing, and we had more than one player from the beginning, let's celebrate!
        if (alivePlayers === 1 && balls.children.length > 1 && !decidedGame) {
            decidedGame = true;
            this.game.state.start('Score');
        }
    },
    render : function (){
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // Properly centers game in windowed mode, but aligning
        // horizontally makes it off-centered in fullscreen mode.
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // Docs say this is necessary, but it doesn't seem to change behavior?
        this.scale.setScreenSize(true);

        // This is necessary to scale before waiting for window changes.
        this.scale.refresh();

        this.input.onDown.add(this.gofull, this);
    },
    semenSplat: function (ground, semen) {
      debugger;
        semen.animations.stop('move');
        semen.animations.play('splat', 18, false, true);

        setTimeout(function () {
            semen.kill();
        }, 500);
    },
    collision : function (ball) {
        ball.kill();
    },
    gofull : function() {
        if (this.scale.isFullScreen) {
            this.scale.stopFullScreen();
        } else {
            this.scale.startFullScreen(false);
        }
    },
    randomRange : function(max, min) {
        return Math.random() * (max - min) + min;
    },
    randomIntRange: function (max, min) {
        return (min + Math.floor(Math.random() * (max - min + 1)));
    }
};