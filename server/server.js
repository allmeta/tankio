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
  socket.on("name", (name) => {
    socket.broadcast.emit("newPlayer", createPlayer(name, socket.id))
    socket.emit("currentPlayers", players)
  })

  socket.on("move", (mov) =>
    socket.broadcast.emit("playerMove", {
      id: socket.id,
      x: (players[socket.id].x = mov.x),
      y: (players[socket.id].y = mov.y)
    })
  )

  socket.on("rotate", (r) =>
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
    cooldown: true
  })

http.listen(3000, () => console.log("listening on *:3000"))
