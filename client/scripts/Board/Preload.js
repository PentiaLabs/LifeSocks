LifeSocks.Preloader = function () { };
LifeSocks.Preloader.prototype = {
  preload: function () {
	this.game.stage.backgroundColor = '#16181a';
	this.preloadBg = this.add.sprite((this.game.width / 2) - 411, (this.game.height) / 2, 'preloaderBg');
	this.preloadBar = this.add.sprite((this.game.width / 2) - 411, (this.game.height) / 2, 'preloaderBar');
	this.load.setPreloadSprite(this.preloadBar);
	
	/*
	this.load.audio('boing', ['/assets/sounds/boing.ogg']);
	this.load.audio('fart', ['/assets/sounds/fart.ogg']);
	*/

	//Selection of possible assets
	this.load.image('logotype', '/assets/logotype.png');
	this.load.image('sock', '/assets/sock.png');
	this.load.image('ground', '/assets/ground.png');
	this.load.atlas('semen-sock', '/assets/semem-sock-sprite.png', '/assets/semen-sock.json');

	// Player characters and labels
	this.load.atlas('labels', '/assets/labels.png', '/assets/labels.json');
	this.load.atlas('semen', '/assets/semen.png', '/assets/semen.json');

	// Countdown graphics
	this.load.image('countdown-headline', '/assets/countdownheadline.png');
	this.load.atlas('countdown', '/assets/countdown.png', '/assets/countdown.json');

	this.load.image('screen-bg', '/assets/splashscreen.png');
	this.load.image('game-bg', '/assets/game_background.png');
	this.load.image('score-bg', '/assets/scorescreen_background.png');
	this.load.image('score-txt', '/assets/scorescreen_txt.png');

  },
  create: function () {
	this.game.state.start('MainMenu');
  }
};
