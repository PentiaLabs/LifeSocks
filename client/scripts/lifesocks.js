// mods by Patrick OReilly 
// Twitter: @pato_reilly Web: http://patricko.byethost9.com
var game = new Phaser.Game(1280, 768, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.stage.disableVisibilityChange = true;
    game.load.image('ball', 'assets/LifeSocks/ball.png');
    game.load.image('pinkball', 'assets/LifeSocks/pinkball.png');
    game.load.image('borderShort', 'assets/LifeSocks/Border_short.jpg');
    game.load.image('borderLong', 'assets/LifeSocks/Border_long.jpg');

    game.load.atlas('semen', 'assets/semen.png', 'assets/semen.json');
}

var image;
var balls;
var speed = 200;
var dangerZone;
var players = {};
var add = [];
var semen;

function create() {
    game.stage.backgroundColor = '#c8c8c8';
    game.physics.startSystem(Phaser.Physics.ninja);

    //  The base of our sperm cell
    semen = game.add.sprite(200, 200, 'semen', 'semen1');
    semen.anchor.setTo(0.5, 0.5);
    semen.animations.add('move', [
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

    game.physics.enable(semen, Phaser.Physics.ninja);
    //semen.body.drag.set(0.2);
    //semen.body.maxVelocity.setTo(400, 400);
    semen.body.velocity.x = 200;
    semen.body.collideWorldBounds = true;

    semen.animations.play('move', 18, true);

    balls = game.add.group();
    dangerZone = game.add.group();

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
        balls.create(randomRange(1200, 10), randomRange(768, 10), 'ball');
    }


    // The player and its settings
   
    balls.setAll("body.velocity.x", 200);
    balls.setAll("body.velocity.y", 200);
    balls.setAll("body.bounce.y", 0.8);
    balls.setAll("body.bounce.x", 0.8);
    balls.setAll("body.collideWorldBounds", true);

}

function update() {
    //// setting gyroscope update frequency
    //gyro.frequency = 10;
    //// start gyroscope detection
    //gyro.startTracking(function(o) {
    //    // updating player velocity
    //    player.body.velocity.x += o.gamma/20;
    //    player.body.velocity.y += o.beta/20;
    //});

    game.physics.arcade.collide(balls);
  //  game.physics.arcade.overlap(balls, dangerZone, collision, null, this);

    for (var i = 0; i < add.length; i++) {
        var newPlayer = balls.create(randomRange(1200, 10), randomRange(768, 10), 'pinkball');
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
        game.physics.arcade.velocityFromRotation(players[player].rotation, speed, players[player].body.velocity);
    }
   
}

function render() {

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Properly centers game in windowed mode, but aligning
    // horizontally makes it off-centered in fullscreen mode.
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    // Docs say this is necessary, but it doesn't seem to change behavior?
    game.scale.setScreenSize(true);

    // This is necessary to scale before waiting for window changes.
    game.scale.refresh();

    game.input.onDown.add(gofull, this);

}

function collision(ball) {
    ball.kill();
}

function gofull() {
    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}

function randomRange(max, min) {
    return Math.random() * (max - min) + min;
}

function randomIntRange(max, min) {
    return (min + Math.floor(Math.random() * (max - min + 1)));
}

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