# LifeSocks Server
This is the server that connects all the controllers and the board.

WebSocket messages is documented like `message [argument, argumet2]`

## Events

### Controller

#### Send

- `action` Control commands, rotate left and right.

#### Received
- `gameStarted` When the host starts the game this event is emitted.
- `serverRefusedJoin` when the server does not allow a player to join.

### Board

#### Send

- `gameover` When the game has ended, this is emitted. Later on the server should know that it's ended due to only one player being alive. But right now it's useful.

#### Received
- `playerLeftRoom` (UserData), Is emmitted when a player leaves a room, this could be due to multiple reasons, like closing the browser or losing internet connection.
- `startGame` When the host starts the game this event is emitted.
- `playerJoinedRoom []` (UserData), Is emmitted when a player joins a room.
- `commands [command, UserData]`  this is emitted by the controller and replayed by the server to the board. The server adds the userdata for the user that emitted the event.
