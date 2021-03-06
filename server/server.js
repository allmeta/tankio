const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

app.use(express.static(__dirname + "/../client"))
app.get("/", (req, res) =>
  res.sendFile("index.html", { root: __dirname + "/../client" })
)
const players = {}

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    io.emit("playerDisconnect", socket.id)
    delete players[socket.id]
  })

  socket.on("msg", msg => {
    io.emit('msg', msg)
  })

  socket.on("name", (name) => {
    socket.broadcast.emit("newPlayer", createPlayer(name, socket.id))
    socket.emit("currentPlayers", players)
  })

  socket.on(
    "move",
    ({ x, y }) =>
      socket.id in players &&
      socket.broadcast.emit("playerMove", {
        id: socket.id,
        x: (players[socket.id].x = x),
        y: (players[socket.id].y = y)
      })
  )

  socket.on(
    "rotate",
    ({ r }) =>
      socket.id in players &&
      socket.broadcast.emit("playerRotate", {
        id: socket.id,
        r: (players[socket.id].r = r)
      })
  )
})

const createPlayer = (name, id) =>
  (players[id] = {
    name,
    color: `hsl(${Math.floor(Math.random() * 360)},69%,54%)`,
    id,
    x: 0,
    y: 0,
    r: 0,
    speed: 5,
    vx: 0,
    vy: 0,
    shootspeed: 20,
    bullets: {},
    size: 25,
    cooldown: true,
    hp: 100
  })

http.listen(3000, () => console.log("listening on *:3000"))
