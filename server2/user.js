var _ = require('underscore');
var uuid = require('node-uuid');

module.exports = (function() {
  function User(socket, data) {
    this.id = uuid.v4();
    this._socket = socket;
    this.name = 'Nameless User';
    this.disconnectedSince = null;
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
        name: this.name
      };
    },

    delete: function() {
      this.disconnectedSince = this.disconnectedSince || new Date().getTime();
      this.leaveRoom();
      //this._socket.disconnect();
      this.cloak._deleteUser(this);
    }

  };

  return User;
})();