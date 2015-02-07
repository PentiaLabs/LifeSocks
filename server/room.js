/*
	Board/Room logic
*/
var room = {
	create: function(roomid) {
		return {
			id: roomid,
			width: 800,
			height: 800,
			players: []
		}
	}
};

module.exports = room;