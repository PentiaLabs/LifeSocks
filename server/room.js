/*
	Board/Room logic
*/
var room = {
	create: function(roomid) {
		return {
			id: roomid,
			players: []
		}
	}
};

module.exports = room;