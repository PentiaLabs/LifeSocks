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
    //this.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL; //resize your window to see the stage resize too
    this.stage.disableVisibilityChange = true;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    this.game.state.start('Preloader');
  }
};