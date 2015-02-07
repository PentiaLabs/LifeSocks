var LifeSocks = {};
LifeSocks.Boot = function (game) { };
LifeSocks.Boot.prototype = {
  preload: function () {
    this.load.image('preloaderBg', 'assets/loading-bg.png');
    this.load.image('preloaderBar', 'assets/loading-bar.png');
  },
  create: function () {
    // Stretch to fill
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.stage.disableVisibilityChange = true;
    this.game.state.start('Preloader');
  }
};