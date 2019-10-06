const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket")(http);

app.get("/", (req, res) => res.send("../client/index.html"));
const players = [];

io.on("connection", socket => {
  socket.on("name", name => {
    io.emit("new player", createNewPlayer(name));
  });
});

const createNewPlayer = name => {
  return players[
    players.push({
      name,
      color: `hsl(${Math.floor(Math.random() * 360)},100%,50%)`
    }) - 1
  ];
};

http.listen(3000, () => console.log("listening on *:3000"));
