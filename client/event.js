import { addPlayer, game, socket } from "./lib"
socket.on("newPlayer", (player) => addPlayer(player))
socket.on("currentPlayers", (players) =>
  Object.entries(players).forEach(([key, val]) => addPlayer(val))
)
socket.on(
  "playerMove",
  ({ id, ...props }) => (game.players[id] = { ...props, ...game.players[id] })
)
socket.on(
  "playerRotate",
  ({ id, ...props }) => (game.players[id] = { ...props, ...game.players[id] })
)
// socket.on("playerBullet")
