import { game, key, socket } from "./lib.js"

const init = () => {
  game.camera.position.set(game.width / 2, game.height / 2, 100)
  game.renderer.setSize(game.width, game.height)
  document.body.appendChild(game.renderer.domElement)
  game.scene.background = new THREE.Color(0x0a0e14)

  //listeners
  window.addEventListener("keyup", (event) => key.onKeyUp(event), false)
  window.addEventListener("keydown", (event) => key.onKeyDown(event), false)
  window.addEventListener("mousemove", (event) => {
    game.mx = event.pageX
    game.my = game.height - event.pageY
  })

  //register
  socket.emit("name", "kms")
  update()
}

const update = () => {
  // upddate your shit, and draw all
  if (Object.entries(game.players).length !== 0) {
    game.players[socket.id].update()
    Object.entries(game.players).forEach(([k, x]) => {
      x.draw()
    })

    game.renderer.render(game.scene, game.camera)

    socket.emit("move", {
      x: game.players[socket.id].x,
      y: game.players[socket.id].y
    })
    socket.emit("rotate", { r: game.players[socket.id].r })
  }
  requestAnimationFrame(update)
}

window.addEventListener("load", init)
