var _ = require('underscore');
var User = require('./user.js');
var Room = require('./room.js');

var gameServer = {
	userSockets: [],
	users: {},
	rooms: {},
	createRoom: function(socket, name) {
		var roomName = name || 'Nameless Room';
		room = new Room(socket, roomName);
		this.rooms[room.id] = room;
		return room;
	},
	getRoom: function(id) {
      return this.rooms[id] || false;
    },
    getRooms: function() {
        return _.values(this.rooms);
    },
    userCount: function() {
    	return _(users).size();
    },
    getSocketFromSocketId: function(socketId) {
		return this.userSockets[socketId];
	}
};

module.exports = gameServer;