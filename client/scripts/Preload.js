LifeSocks.Preloader = function(game) {};
LifeSocks.Preloader.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = '#16181a';
		this.preloadBg = this.add.sprite((320-297)/2, (480-145)/2, 'preloaderBg');
		this.preloadBar = this.add.sprite((320-158)/2, (480-50)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		/*this.load.image('ball', 'img/ball.png');
		this.load.image('hole', 'img/hole.png');
		this.load.image('element-w', 'img/element-w.png');
		this.load.image('element-h', 'img/element-h.png');
		this.load.image('panel', 'img/panel.png');
		this.load.image('title', 'img/title.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('button-start', 'img/button-start.png');
		
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');

		this.load.spritesheet('button-audio', 'img/button-audio.png', 35, 35);

		this.load.audio('bounce', ['audio/phaserUp3.ogg']);*/

	    this.load.image('ball', 'assets/LifeSocks/ball.png');
	    this.load.image('pinkball', 'assets/LifeSocks/pinkball.png');
	    this.load.image('borderShort', 'assets/LifeSocks/Border_short.jpg');
	    this.load.image('borderLong', 'assets/LifeSocks/Border_long.jpg');

	    //Selection of possible assets
	    this.load.image('logotype', 'assets/LifeSocks/logotype.png');
	    this.load.image('mobilbackground', 'assets/LifeSocks/moilbackground.png');
	    this.load.image('sock', 'assets/LifeSocks/sock.png');
	    this.load.image('welcome-player', 'assets/LifeSocks/welcomeplayer-title.png');
	    this.load.image('winner-player', 'assets/LifeSocks/winner-player-title.png');
	    this.load.image('success-message', 'assets/LifeSocks/wsuccess-message.png');

	    this.load.image('label-blue', 'assets/LifeSocks/Lables/label-blue.png');
	    this.load.image('label-green', 'assets/LifeSocks/Lables/label-green.png');
	    this.load.image('label-grey', 'assets/LifeSocks/Lables/label-grey.png');
	    this.load.image('label-pink', 'assets/LifeSocks/Lables/label-pink.png');
	    this.load.image('label-yellow', 'assets/LifeSocks/Lables/label-yellow.png');


	    // Replace this :)
	    this.load.image('button-start', 'assets/LifeSocks/startgamebutton.png');
	    this.load.image('screen-bg', 'assets/LifeSocks/splashbaggrund.png');

	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};