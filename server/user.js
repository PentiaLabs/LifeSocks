var _ = require('underscore');
var uuid = require('node-uuid');
var gameServer = require('./gameServer.js');

var NameFactory = require('./NameFactory.js')
var namefactory = new NameFactory();

module.exports = (function() {
  function User(socket, data) {
    this.id = uuid.v4();
    this._socketId = socket.id;
    this.name = namefactory.generate();
    this.disconnectedSince = null;
    this.isHost = false; // Is this player the host?
    this.data = data || {};
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
        isHost: this.isHost
      };
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