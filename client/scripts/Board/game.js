// Move game logic here...
var image;
var balls;
var speed = 200;
var frameRate = 16;
var dangerZone;
var players = {};
var add = [];
var nicknames = [];
var availableBadges = [
    'label-blue', 
    'label-green',
    'label-grey', 
    'label-pink', 
    'label-yellow'
];
var bottomGround, topGround, leftGround, rightGround;
var semenCG;
var groundCG;
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
        nicknames.push(player.nickname);
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
        this.physics.p2.restitution = 1;

        semenCG = this.physics.p2.createCollisionGroup();
        groundCG = this.physics.p2.createCollisionGroup();

        bottomGround = this.add.sprite(0, this.world.height - 10, 'ground');
        bottomGround.scale.setTo(4, 1);
        this.physics.p2.enable(bottomGround);
        bottomGround.body.width = this.world.width;
        bottomGround.body.mass = 100;
        bottomGround.body.static = true;
        bottomGround.body.setCollisionGroup(groundCG);
        bottomGround.body.data.motionState = Phaser.Physics.P2.Body.STATIC;

        topGround = this.add.sprite(0, 10, 'ground');
        topGround.scale.setTo(4, 1);
        this.physics.p2.enable(topGround);
        topGround.body.width = this.world.width;
        topGround.body.mass = 100;
        topGround.body.static = true;
        topGround.body.setCollisionGroup(groundCG);
        topGround.body.data.motionState = Phaser.Physics.P2.Body.STATIC;

        leftGround = this.add.sprite(10, 0, 'ground');
        leftGround.scale.setTo(4, 1);
        this.physics.p2.enable(leftGround);
        leftGround.body.width = this.world.width;
        leftGround.body.mass = 100;
        leftGround.body.static = true;
        leftGround.body.angle = 90;
        leftGround.body.setCollisionGroup(groundCG);
        leftGround.body.data.motionState = Phaser.Physics.P2.Body.STATIC;

        rightGround = this.add.sprite(this.world.width - 10, 0, 'ground');
        rightGround.scale.setTo(4, 1);
        this.physics.p2.enable(rightGround);
        rightGround.body.width = this.world.width;
        rightGround.body.mass = 100;
        rightGround.body.angle = 90;
        rightGround.body.static = true;
        rightGround.body.setCollisionGroup(groundCG);
        rightGround.body.data.motionState = Phaser.Physics.P2.Body.STATIC;
        
        rightGround.body.collides(semenCG, this.semenSplat, this);
        leftGround.body.collides(semenCG, this.semenSplat, this);
        bottomGround.body.collides(semenCG, this.semenSplat, this);
        topGround.body.collides(semenCG, this.semenSplat, this);

    },
    update : function() {
        for (var i = 0; i < add.length; i++) {
            var x = this.randomRange(1200, 100);
            var y = this.randomRange(768, 100);

            var nickname = nicknames[i];
            var labelStr = nickname.substr(0, 1).toUpperCase();

            var semen = this.add.sprite(x, y, 'semen', 'semen1');

            // find next badge color - and cycle through them from the beginning, when we've used them all
            var badgeColor = i >= availableBadges.length ? availableBadges[i - availableBadges.length] : availableBadges[i];

            var badge = this.add.sprite(0, 0, badgeColor);
            badge.scale.setTo(0.75, 0.75);
            badge.alpha = 0.5;

            var label = this.add.text(20, 20, labelStr, { font: '48px Arial', fill: '#ffffff', align: 'center', stroke: '#cccccc', strokeThickness: 1 });
            label.angle = -90;
            label.scale.setTo(0.75, 0.75);

            semen.animations.add('move', ['semen1','semen2','semen3','semen4','semen5','semen6','semen7','semen6','semen5','semen4','semen3','semen2'], frameRate, true);

            semen.animations.add('splat', ['splat1','splat2','splat3'], frameRate, false);

            semen.animations.add('smack', ['smack1','smack2','smack3','smack4'], frameRate, false);

            this.physics.p2.enable(semen);

            semen.body.setCircle(60);
            semen.anchor.setTo(0.5, 0.5);
            semen.scale.setTo(0.99, 0.99);

            // add badge to player
            semen.addChild(badge);
            badge.x = 30;
            badge.y = 0;

            // add label to badge
            semen.addChild(label);
            label.x = 48;
            label.y = 52;
            
            semen.animations.play('move', 18, true);

            semen.body.mass = 1;
            semen.body.setCollisionGroup(semenCG);

            semen.body.collides(groundCG);
            semen.body.collides(semenCG, this.semenSmack, this);

            // let's decide what happens when player collides with ground and wall areas
            leftGround.body.collides(semen, this.semenSplat, this);
            rightGround.body.collides(semen, this.semenSplat, this);
            topGround.body.collides(semen, this.semenSplat, this);
            bottomGround.body.collides(semen, this.semenSplat, this);
            
            players[add[i]] = semen;
        }

        add = [];
        nicknames = [];

        for (player in players) {
            if (players[player].left) {
              players[player].body.angle -= 20;
                players[player].left = false;
            } else if (players[player].right) {
              players[player].body.angle += 20;
              players[player].right = false;
            } else {
              players[player].body.setZeroRotation();
            }

            // start your engines...
            players[player].body.thrust(100);

            // ...but control max velocity
            this.constrainVelocity(players[player], 5);
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

    constrainVelocity: function(sprite, maxVelocity) {
      var body = sprite.body
      var angle, currVelocitySqr, vx, vy;

      vx = body.data.velocity[0];
      vy = body.data.velocity[1];

      currVelocitySqr = vx * vx + vy * vy;

      if (currVelocitySqr > maxVelocity * maxVelocity) {
        angle = Math.atan2(vy, vx);

        vx = Math.cos(angle) * maxVelocity;
        vy = Math.sin(angle) * maxVelocity;

        body.data.velocity[0] = vx;
        body.data.velocity[1] = vy;
        //console.log('limited speed to: '+maxVelocity);
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

    /**
    * semenStop
    * - stops move animation from semen sprite
    *
    * @param semen object
    * @api public
    */
    semenStop: function (semen) {
        semen.sprite.animations.stop('move');
    },

    /**
    * semenMove
    * - starts move animation from semen sprite
    *
    * @param semen object
    * @api public
    */
    semenMove: function (semen) {
        semen.sprite.animations.play('move', frameRate, true);
    },

    /**
    * semenSmack
    * - plays smack animation when two semen sprites collide
    *
    * @param semen object
    * @api public
    */
    semenSmack: function (semen) {
        var game = this;
        var anim = semen.sprite.animations.getAnimation('smack');

        anim.onComplete.add(function () {
            game.semenStop(semen);
            game.semenMove(semen);
        }, this);

        semen.sprite.animations.play('smack', 8, false);
    },

    /**
    * semenSplat
    * - plays splat animation when semen dies (act as callback to collide method)
    *
    * @param ground object, semen object
    * @api private
    */
    semenSplat: function (ground, semen) {
        var anim = semen.sprite.animations.getAnimation('splat');

        this.semenStop(semen);

        anim.onComplete.add(function () {
            semen.sprite.kill();
        }, this);

        semen.sprite.animations.play('splat', frameRate, false, true);
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