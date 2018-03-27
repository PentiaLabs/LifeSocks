var _ = require('underscore');
var Room = require('./room.js');

var gameServer = {
	userSockets: [],
	users: {},
	rooms: {},
	createRoom: function(socket, name) {
		let roomName = name || 'Nameless Room';
		let room = new Room(socket, roomName);
		this.rooms[room.id] = room;
		return room;
	},
	getRoom: function(id) {
		return this.rooms[id] || false;
	},
	getRoomFromName: function(name) {
		return _.findWhere(this.rooms, { name: name });
	},
	getRooms: function() {
		return _.values(this.rooms);
	},
	userCount: function() {
		return _(gameServer.users).size();
	},
	getSocketFromSocketId: function(socketId) {
		return this.userSockets[socketId];
	}
};

module.exports = gameServer;
