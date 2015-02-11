LifeSocks.Preloader = function (game) { };
LifeSocks.Preloader.prototype = {
	preload: function () {
		this.preloadBg = this.add.sprite((1920 / 2) - 411, (1080) / 2, 'preloaderBg');
		this.preloadBar = this.add.sprite((1920 / 2) - 411, (1080) / 2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		/*
		this.load.audio('bounce', ['audio/phaserUp3.ogg']);
		*/
		
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

		this.load.image('button-start', 'assets/LifeSocks/startgamebutton.png');

		this.load.image('controller-bg', 'assets/controller/mobilbackground.png');

		this.load.image('controller-left', 'assets/controller/control-left.png');
		this.load.image('controller-right', 'assets/controller/control-right.png');

		this.load.image('controller-start', 'assets/controller/mobil-startgame-button.png');
		this.load.image('controller-start-header', 'assets/controller/mobil-startgame-header.png');
	},
	create: function () {
		this.game.state.start('MainMenu');
	}
};
