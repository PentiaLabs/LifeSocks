var player = {
	create: function(playerid) {
		return {
			id: playerid,
			nickname: 'Nick Namenik',
			points: 0,
			speed: 0,
			killed: false
		}
	},
	remove: function (playerid) {}
};

module.exports = player;