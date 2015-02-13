LifeSocks.Preloader = function (game) { };
LifeSocks.Preloader.prototype = {
	preload: function () {
		this.preloadBg = this.add.sprite((1920 / 2) - 411, (1080) / 2, 'preloaderBg');
		this.preloadBar = this.add.sprite((1920 / 2) - 411, (1080) / 2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		
		/*
		this.load.audio('boing', ['assets/sounds/boing.ogg']);
		this.load.audio('fart', ['assets/sounds/fart.ogg']);
		*/
		
		// Selection of possible assets
		this.load.image('logotype', 'assets/logotype.png');
		this.load.image('sock', 'assets/controller/sock.png');

		// Headlines and text
		this.load.image('header-first-player', 'assets/controller/first-player-title.png');
		this.load.image('header-are-you-ready', 'assets/controller/areyouready-headline.png');
		this.load.atlas('text-waiting', 'assets/controller/waiting.png', 'assets/controller/waiting.json');	

		// Game controls
		this.load.image('controller-bg', 'assets/controller/mobilbackground.png');
		this.load.image('controller-left', 'assets/controller/control-left.png');
		this.load.image('controller-right', 'assets/controller/control-right.png');
		this.load.image('controller-start-button', 'assets/controller/startgamebutton.png');

		// Player characters and labels
		this.load.image('label-blue', 'assets/label-blue.png');
		this.load.image('label-green', 'assets/label-green.png');
		this.load.image('label-grey', 'assets/label-grey.png');
		this.load.image('label-pink', 'assets/label-pink.png');
		this.load.image('label-yellow', 'assets/label-yellow.png');
		
		this.load.atlas('semen', 'assets/semen.png', 'assets/semen.json');
	},
	create: function () {
		this.game.state.start('MainMenu');
	}
};
