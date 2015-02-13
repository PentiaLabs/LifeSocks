/*
	Board/Room logic
*/
var _ = require('underscore');
var uuid = require('node-uuid');
var chalk = require('chalk');

module.exports = (function() {
	function Room(socket, nameArg, minRoomMembers, maxRoomMembers) {
		this.minRoomMembers = minRoomMembers || 2;
		this.maxRoomMembers = maxRoomMembers || 10;
		this.id = uuid.v4();
		this._socketId = socket.id;
		this._socket = socket;
		this.name = nameArg;
		this.members = [];
		this.gameStarted = false;
		this.data = {};
		this.created = new Date().getTime();
	}

	Room.prototype = {
		addMember: function(user) {
			if (!this._shouldAllowUser(user)) {
				user.message('serverRefusedJoin');
				return false;
			}

			this.members.push(user);
			user.room = this;

			/*
				We need to do this a smarter way, if the host leaves no one is host.
			*/
			if(this.getMembers().length === 1) {
				user.isHost = true;
			}

			this._socket.emit('playerJoinedRoom', user.getUserData());
			console.log(chalk.green('playerJoinedRoom:', this.id, user.id, this.getMembers()));

			this.sendUserCount();
			
			return true;
		},
		removeMember: function(user) {
			if (user.room !== this) {
				return;
			}
			this.members = _(this.members).without(user);

			if(user.isHost) {
				this.assignNewHost();
			}

			this._socket.emit('playerLeftRoom', user.getUserData());
			console.log(chalk.red('playerLeftRoom:', this.id, user.id, this.getMembers()));

			delete user.room;

			this.sendUserCount();
		},
		removeAllMembers: function () {
			_.forEach(this.members, function(member) {
				member.leaveRoom();
			}.bind(this));
		},
		assignNewHost: function (member) {
			var user = member;
			if(!user) {
				user = this.getMembers()[0]; // Make the first play in the array host.
			}
			if(user) {
				user.isHost = true;
				user.message('playerData', user.getUserData());
			}
		},
		sendUserCount: function () {
			var usersInRoom = this.members.length;

			_.forEach(this.members, function(member) {
				member.message('playerCount', usersInRoom);
			}.bind(this));
		},
		getMembers: function(json) {
			if (json) {
				return _.invoke(this.members, 'getUserData');
			}
			else {
				return _.values(this.members);
			}
		},
		age: function() {
			return new Date().getTime() - this.created;
		},
		messagePlayers: function(name, arg) {
			_.forEach(this.members, function(player) {
				player.message(name, arg);
			}.bind(this));
		},
		_shouldAllowUser: function() {
			if(this.gameStarted) {
				return false;
			}
			// Check that game is not running already ect.
			return true;
		}
	};

	return Room;

})();
