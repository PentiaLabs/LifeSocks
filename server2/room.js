/*
	Board/Room logic
*/
var _ = require('underscore');
var uuid = require('node-uuid');


module.exports = (function() {
	function Room(socket, nameArg, minRoomMembers, maxRoomMembers) {
		this.minRoomMembers = minRoomMembers || 2;
		this.maxRoomMembers = maxRoomMembers || 10;
		this.id = uuid.v4();
		this._socketId = socket.id;
		this.name = nameArg;
		this.players = [];
		this.data = {};
		this.created = new Date().getTime();
	}

	Room.prototype = {
		addMember: function(user) {
			if (!this._shouldAllowUser(user)) {
		    	return false;
		    }

		    this.players.push(user);
		    user.room = this;

		    return true;
		},

		removeMember: function(user) {
			if (user.room !== this) {
		        return;
		    }
		    this.members = _(this.members).without(user);
		    delete user.room;

		},

		age: function() {
			return new Date().getTime() - this.created;
		},

		_shouldAllowUser: function() {
			// Check that game is not running already ect.
			return true;
		}
	};

	return Room;

})();