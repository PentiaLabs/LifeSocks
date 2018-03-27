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
		
		// Selection of possible assets
		this.load.image('logotype', '/assets/logotype.png');

		// Headlines and text

		// Headlines for intermediate screen
		this.load.image('header-first-player', '/assets/controller/first-player-title.png');
		this.load.image('header-are-you-ready', '/assets/controller/areyouready-headline.png');
		this.load.atlas('text-waiting', '/assets/controller/waiting.png', '/assets/controller/waiting.json');	

		// Headlines for result screen

		// first for losers
		this.load.image('header-you-lost', '/assets/controller/youlost-headline.png');
		this.load.image('header-youre-a-stain', '/assets/controller/youlost-headline-2.png');
		this.load.image('splashsperm', '/assets/controller/splashsperm.png');	

		// then for the winner
		this.load.image('header-you-won', '/assets/controller/winner-headline.png');
		this.load.image('header-1-in-1000000', '/assets/controller/winner-headline-2.png');
		this.load.image('sock', '/assets/controller/sock.png');

		// Game controls
		this.load.image('controller-bg', '/assets/controller/mobilbackground.png');
		this.load.image('controller-left', '/assets/controller/control-left.png');
		this.load.image('controller-right', '/assets/controller/control-right.png');
		this.load.image('controller-start-button', '/assets/controller/startgamebutton.png');

		// Player characters and labels
		this.load.atlas('labels', '/assets/labels.png', '/assets/labels.json');
		this.load.atlas('semen', '/assets/semen.png', '/assets/semen.json');
	},
	create: function () {
		this.game.state.start('MainMenu');
	}
};
