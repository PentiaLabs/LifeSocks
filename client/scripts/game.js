// Move game logic here...
LifeSocks.Game = function(game) {
    keys = null;
    ball = null;
    walls = null;
    timer = 0;
    totalTimer = 0;
    loop = null;
    firstRun = true;
    level = 0;
    sfx_bounce = null;
    maxLevels = 5;
    audio = true;
};
LifeSocks.Game.prototype = {
    create: function() {
        this.add.sprite(0, 0, 'screen-bg');
        window.addEventListener("deviceorientation", this.handleOrientation, true);
    },
    handleOrientation: function(e) {
        var x = e.gamma; // range [-90,90]
        var y = e.beta;  // range [-180,180]
        ball.body.velocity.x += x/2;
        ball.body.velocity.y += y;
    }
};