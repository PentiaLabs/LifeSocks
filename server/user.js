var _ = require('underscore');
var uuid = require('node-uuid');
var gameServer = require('./gameServer.js');

var NameFactory = require('./NameFactory.js')
var namefactory = new NameFactory();

var BadgeFactory = require('./BadgeFactory.js');
var badgefactory = new BadgeFactory();

module.exports = (function() {
	function User(socket) {
		this.id = uuid.v4();
		this._socket = socket;
		this._socketId = socket.id;
		this.name = namefactory.generate();
		this.badge = badgefactory.generate();
		this.avatar = (Math.floor(Math.random() * 6) + 1); // TODO: Make the player select between 3 avatars that each got a name.
		this.disconnectedSince = null;
		this.isHost = false; // Is this player the host?
		this.isAlive = true;
	}

	User.prototype = {
		leaveRoom: function() {
			if (this.room !== undefined) {
				this.room.removeMember(this);
			}
		},

		joinRoom: function(room) {
			room.addMember(this);
		},

		getRoom: function() {
			return this.room;
		},

		connected: function() {
			return this.disconnectedSince === null;
		},

		getUserData: function() {
			return {
				id: this.id,
				name: this.name,
				badge: this.badge,
				avatar: this.avatar,
				isHost: this.isHost,
				isAlive: this.isAlive
			};
		},

		playerKilled: function () {
			this.isAlive = false;
			this.message('playerKilled');
		},

		message: function(name, arg) {
			console.log('Message send to:', this.id, name, arg);
			var socket = gameServer.getSocketFromSocketId(this._socketId);
			socket.emit(name, arg);
		},

		delete: function() {
			//this.disconnectedSince = this.disconnectedSince || new Date().getTime();
			this.leaveRoom();
			//this._socket.disconnect();
		}
	};

	return User;
})();
