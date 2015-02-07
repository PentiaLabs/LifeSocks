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
        this.stage.backgroundColor = '#c8c8c8';
        this.physics.startSystem(Phaser.Physics.ninja);

        balls = this.add.group();
        dangerZone = this.add.group();

        //game.physics.ninja.enable(balls);
        balls.enableBody = true;
        dangerZone.enableBody = true;

        var leftZone = dangerZone.create(0, 0, 'borderShort');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        leftZone.scale.setTo(4, 1);

        var rightZone = dangerZone.create(0, 0, 'borderLong');
        rightZone.rotate = 90;
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        rightZone.scale.setTo(1, 4);

        for (var i = 0; i < 20; i++) {
            balls.create(this.randomRange(1200, 10), this.randomRange(768, 10), 'ball');
        }

        // The player and its settings

        balls.setAll("body.velocity.x", 200);
        balls.setAll("body.velocity.y", 200);
        balls.setAll("body.bounce.y", 0.8);
        balls.setAll("body.bounce.x", 0.8);
        balls.setAll("body.collideWorldBounds", true);
    },
    update : function() {
        this.physics.arcade.collide(balls);
        //  game.physics.arcade.overlap(balls, dangerZone, collision, null, this);

        for (var i = 0; i < add.length; i++) {
            var newPlayer = balls.create(this.randomRange(1200, 10), this.randomRange(768, 10), 'pinkball');
            newPlayer.body.velocity.setTo(200, 200);
            newPlayer.body.bounce.setTo(0.8, 0.8);
            newPlayer.body.collideWorldBounds = true;
            newPlayer.anchor.setTo(0.5, 0.5);
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