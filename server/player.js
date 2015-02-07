var player = {
	create: function(playerid) {
		return {
			id: playerid,
			nickname: 'Nick Namenik',
			x: Math.floor(Math.random() * self.board.width) + 1,
			y: Math.floor(Math.random() * self.board.height) + 1,
			points: 0,
			speed: 0,
			killed: false
		}
	}
};

module.exports = player;