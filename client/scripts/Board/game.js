// Move game logic here...
var image;
var balls;
var speed = 200;
var dangerZone;
var players = {};
var add = [];
var ground;

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

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.add.group();
        platforms.enableBody = true;

        ground = platforms.create(0, this.world.height - 50, 'ground');
        ground.body.width = this.world.width;
        ground.body.height = 50;
        ground.scale.setTo(4, 4);
        ground.body.immovable = true;
        ground.body.collideWorldBounds = true;

        this.physics.startSystem(Phaser.Physics.ninja);

        balls = this.add.group();

        //this.physics.ninja.enable(balls);
        balls.enableBody = true;

        // The player and its settings

        balls.setAll("body.velocity.x", 200);
        balls.setAll("body.velocity.y", 200);
        balls.setAll("body.bounce.y", 0.8);
        balls.setAll("body.bounce.x", 0.8);
        balls.setAll("body.collideWorldBounds", true);
        balls.setAll("body.width", 90);
        balls.setAll("body.height", 90);
    },
    update : function() {
        //// setting gyroscope update frequency
        //gyro.frequency = 10;
        //// start gyroscope detection
        //gyro.startTracking(function(o) {
        //    // updating player velocity
        //    player.body.velocity.x += o.gamma/20;
        //    player.body.velocity.y += o.beta/20;
        //});

        this.physics.arcade.collide(balls);
        this.physics.arcade.overlap(balls, ground, this.semenSplat, function (semen, ground) {  return false; }, this);

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

            newPlayer.body.velocity.setTo(200, 200);
            newPlayer.body.bounce.setTo(0.8, 0.8);
            newPlayer.body.collideWorldBounds = true;
            newPlayer.anchor.setTo(0.5, 0.5);
            newPlayer.animations.play('move', 18, true);
            newPlayer.body.width = 100;
            newPlayer.body.height = 100;
            players[add[i]] = newPlayer;
        }

        add = [];

        for (player in players) {
            if (players[player].left) {
                players[player].angle -= 20;
                players[player].left = false;
            }

            if (players[player].right) {
                players[player].angle += 20;
                players[player].right = false;
            }
            this.physics.arcade.velocityFromRotation(players[player].rotation, -speed, players[player].body.velocity);
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
    semenSplat : function (ground, semen) {
        semen.animations.stop('move');
        semen.animations.play('splat', 18, false, true);
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