/*
	Board/Room logic
*/
var room = {
	create: function(roomid) {
		return {
			id: roomid,
			width: 0,
			height: 0
		}
	}
};

module.exports = room;