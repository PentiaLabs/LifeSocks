LifeSocks.Preloader = function () { };
LifeSocks.Preloader.prototype = {
  preload: function () {
    this.game.stage.backgroundColor = '#16181a';
    this.preloadBg = this.add.sprite((this.game.width / 2) - 411, (this.game.height) / 2, 'preloaderBg');
    this.preloadBar = this.add.sprite((this.game.width / 2) - 411, (this.game.height) / 2, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);
   	
   	/*
	this.load.audio('boing', ['assets/sounds/boing.ogg']);
	this.load.audio('fart', ['assets/sounds/fart.ogg']);
	*/

    this.load.image('borderShort', 'assets/LifeSocks/Border_short.jpg');
    this.load.image('borderLong', 'assets/LifeSocks/Border_long.jpg');
    this.load.image('ground', 'assets/LifeSocks/ground.png');

    //Selection of possible assets
    this.load.image('logotype', 'assets/LifeSocks/logotype.png');
    this.load.image('sock', 'assets/LifeSocks/sock.png');
    this.load.image('welcome-player', 'assets/LifeSocks/welcomeplayer-title.png');
    this.load.image('winner-player', 'assets/LifeSocks/winner-player-title.png');
    this.load.image('success-message', 'assets/LifeSocks/success-message.png');

    this.load.image('label-blue', 'assets/LifeSocks/label-blue.png');
    this.load.image('label-green', 'assets/LifeSocks/label-green.png');
    this.load.image('label-grey', 'assets/LifeSocks/label-grey.png');
    this.load.image('label-pink', 'assets/LifeSocks/label-pink.png');
    this.load.image('label-yellow', 'assets/LifeSocks/label-yellow.png');

    this.load.atlas('semen', 'assets/semen.png', 'assets/semen.json');
    this.load.atlas('semen-sock', 'assets/semem-sock-sprite.png', 'assets/semen-sock.json');

    this.load.image('countdown-headline', 'assets/countdownheadline.png');
    this.load.atlas('countdown', 'assets/countdown.png', 'assets/countdown.json');

    this.load.image('button-start', 'assets/LifeSocks/startgamebutton.png');
    this.load.image('screen-bg', 'assets/splashscreen.png');
    this.load.image('game-bg', 'assets/game_background.png');
    this.load.image('score-bg', 'assets/scorescreen_background.png');
    this.load.image('score-txt', 'assets/scorescreen_txt.png');

  },
  create: function () {
    this.game.state.start('MainMenu');
  }
};
