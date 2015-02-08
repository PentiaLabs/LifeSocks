LifeSocks.Score = function(game) {};
LifeSocks.Score.prototype = {
	create: function() {
	    var text = "Somebody";
	    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	    var t = this.add.text(this.world.centerX-300, 0, text, style);
	    this.add.sprite(0, 0, 'score-bg');

	    console.log('Brian, vi vil gerne have en sæd sock her...');

	}
};