LifeSocks.Result = function () {};
LifeSocks.Result.prototype = {
	create: function () {		
		this.add.sprite(0, 0, 'controller-bg');

		if (LifeSocks.playerData.isAlive) {

			var loserHeadline = this.add.sprite(this.world.centerX, 100, 'header-you-lost');
			loserHeadline.x = this.world.centerX - loserHeadline.width / 2;

			var loserStain = this.add.sprite(this.world.centerX, this.world.centerY, 'splashsperm');
			loserStain.x = this.world.centerX - loserStain.width / 2;
			loserStain.y = this.world.centerY - loserStain.height / 2;

			var loserHeadline2 = this.add.sprite(this.world.centerX, this.world.height - 150, 'header-youre-a-stain');
			loserHeadline2.scale.setTo(0.9, 0.9);

			loserHeadline2.x = this.world.centerX - loserHeadline2.width / 2;

		} else {
			
			var winnerHeadline = this.add.sprite(this.world.centerX, 100, 'header-you-won');
			winnerHeadline.x = this.world.centerX - winnerHeadline.width / 2;

			var winnerStain = this.add.sprite(this.world.centerX, this.world.centerY, 'sock');
			winnerStain.scale.setTo(0.6, 0.6);
			winnerStain.x = this.world.centerX - winnerStain.width / 2;
			winnerStain.y = this.world.centerY - winnerStain.height / 2 + 50;

			var winnerHeadline2 = this.add.sprite(this.world.centerX, this.world.height - 150, 'header-1-in-1000000');
			winnerHeadline2.scale.setTo(0.9, 0.9);

			winnerHeadline2.x = this.world.centerX - winnerHeadline2.width / 2;

		}
	}
};
