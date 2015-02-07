// Move game logic here...
var image;
var balls;
var speed = 200;
var dangerZone;
var players = {};
var add = [];

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
        this.stage.backgroundColor = '#ffffff';
        this.add.sprite(0, 0, 'game-bg');

        this.physics.startSystem(Phaser.Physics.ninja);

        //  The base of our sperm cell
        //semen = this.add.sprite(200, 200, 'semen', 'semen1');
        //semen.anchor.setTo(0.5, 0.5);
        //semen.animations.add('move', [
        //    'semen1',
        //    'semen2',
        //    'semen3',
        //    'semen4',
        //    'semen5',
        //    'semen6',
        //    'semen7',
        //    'semen6',
        //    'semen5',
        //    'semen4',
        //    'semen3',
        //    'semen2'], 18, true);

        //this.physics.enable(semen, Phaser.Physics.ninja);
        ////semen.body.drag.set(0.2);
        ////semen.body.maxVelocity.setTo(400, 400);
        //semen.body.velocity.x = 200;
        //semen.body.collideWorldBounds = true;

        //semen.animations.play('move', 18, true);

        balls = this.add.group();
        dangerZone = this.add.group();

        //this.physics.ninja.enable(balls);
        balls.enableBody = true;
        dangerZone.enableBody = true;

        var leftZone = dangerZone.create(0, 0, 'borderShort');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        leftZone.scale.setTo(4, 1);

        var rightZone = dangerZone.create(0, 0, 'borderLong');
        rightZone.rotate = 90;
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        rightZone.scale.setTo(1, 4);

        //for (var i = 0; i < 20; i++) {
        //    var semen = balls.create(randomRange(1200, 10), randomRange(768, 10), 'semen', 'semen1');
        //    semen.scale.setTo(0.9, 0.9);

        //    semen.anchor.setTo(0.5, 0.5);
        //    semen.animations.add('move', [
        //        'semen1',
        //        'semen2',
        //        'semen3',
        //        'semen4',
        //        'semen5',
        //        'semen6',
        //        'semen7',
        //        'semen6',
        //        'semen5',
        //        'semen4',
        //        'semen3',
        //        'semen2'], 18, true);
        //    semen.animations.play('move', 18, true);
        //}


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
        //  this.physics.arcade.overlap(balls, dangerZone, collision, null, this);

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
                players[player].angle -= 10;
                players[player].left = false;
            }

            if (players[player].right) {
                players[player].angle += 10;
                players[player].right = false;
            }
            this.physics.arcade.velocityFromRotation(players[player].rotation, speed, players[player].body.velocity);
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