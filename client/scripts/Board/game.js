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
        this.physics.p2.setImpactEvents(true);
        this.physics.p2.restitution = 0.6;
        this.physics.p2.defaultRestitution = 0.8;
        this.physics.p2.defaultFriction = 0.2;

        ballsCollisionGroup = this.physics.p2.createCollisionGroup();
        groundCollisionGroup = this.physics.p2.createCollisionGroup();

        ground = this.add.sprite(0, this.world.height - 50, 'ground');
        ground.scale.setTo(4, 4);
        this.physics.p2.enable(ground);
        ground.body.width = this.world.width;
        ground.body.data.motionState = Phaser.Physics.P2.Body.STATIC;
        ground.body.setCollisionGroup(groundCollisionGroup);
        
        ground.body.collides(ballsCollisionGroup, this.semenSplat, this);
    },
    update : function() {
        for (var i = 0; i < add.length; i++) {
            var newPlayer = this.add.sprite(this.randomRange(1200, 10), this.randomRange(768, 10), 'semen', 'semen1');
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

            newPlayer.animations.add('smack', [
                'smack1',
                'smack2',
                'smack3',
                'smack4'], 18, false);

            this.physics.p2.enable(newPlayer);

            newPlayer.body.setCircle(50);
            newPlayer.anchor.setTo(0.5, 0.5);
            newPlayer.animations.play('move', 18, true);

            newPlayer.body.setCollisionGroup(ballsCollisionGroup);
            newPlayer.body.collides(groundCollisionGroup);
            ground.body.collides(newPlayer, this.semenSplat, this);
            
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

            
              players[player].body.reverse(400);
            //this.physics.arcade.velocityFromRotation(players[player].rotation, -speed, players[player].body.velocity);
        }

        // count alive players
        var alivePlayers = 0;
        var numPlayers = 0;
        for (player in players) {
            numPlayers++;
            if (players[player].alive) {
                alivePlayers = alivePlayers + 1;
            }
        }

        // if it's the last man standing, and we had more than one player from the beginning, let's celebrate!
        if (alivePlayers === 1 && numPlayers > 1 && !decidedGame) {
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
        semen.sprite.animations.stop('move');
        semen.sprite.animations.play('splat', 18, false, true);

        setTimeout(function () {
            semen.sprite.kill();
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