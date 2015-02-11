# LifeSocks Server
This is the server that connects all the controllers and the board.

## Events

### Client

#### Received
- `gameStarted` When the host starts the game this event is emitted.

### Board

#### Send

- 'gameOver'

#### Received
- `playerLeftRoom` (UserData), Is emmitted when a player leaves a room, this could be due to multiple reasons, like closing the browser or losing internet connection.
- `startGame` When the host starts the game this event is emitted.
- `playerJoinedRoom` (UserData), Is emmitted when a player joins a room.
- `commands` (command, UserData) this is emitted by the controller and replayed by the server to the board. The server adds the userdata for the user that emitted the event.