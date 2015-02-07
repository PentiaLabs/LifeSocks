var NameFactory = require('./NameFactory.js')
var namefactory = new NameFactory();

var player = {
	create: function(playerid) {
		return {
			id: playerid,
			nickname: namefactory.generate(),
			dead: false
		}
	},
	remove: function (playerid) {}
};

module.exports = player;