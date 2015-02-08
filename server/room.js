/*
	Board/Room logic
*/
var room = {
	create: function(roomid) {
		return {
			id: roomid,
			started: false,
			players: []
		}
	}
};

module.exports = room;