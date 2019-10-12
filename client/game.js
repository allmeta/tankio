import { game, key, socket } from "./lib"

const init = () => {
  with (game) {
    camera.position.set(width / 2, height / 2, 100)
    renderer.setSize(width, height)
    document.body.appendChild(renderer.domElement)
    scene.background = new THREE.Color(0x0a0e14)
  }

  //listeners
  window.addEventListener("keyup", (event) => key.onKeyUp(event), false)
  window.addEventListener("keydown", (event) => key.onKeyDown(event), false)

  //register
  socket.emit("name", "kms")
  update()
}

const update = () => {
  with (game) {
    players.forEach((x) => x.update())
    renderer.render(scene, camera)
  }
  window.requestAnimationFrame(update)
}

window.addEventListener("load", init)
