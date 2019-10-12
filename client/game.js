const socket = io()
const game = {
  width: window.innerWidth,
  height: window.innerHeight,
  scene: new THREE.Scene(),
  camera: new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    1,
    1000
  ),
  renderer: new THREE.WebGLRenderer({ antialias: true })
}
const geometry = {
  hpbar: new THREE.PlaneGeometry(50, 5),
  player: new THREE.CircleGeometry(25, 8),
  turret: new THREE.PlaneGeometry(16, 20),
  bullet: new THREE.CircleGeometry(5, 8)
}
const material = {
  turret: new THREE.MeshBasicMaterial({ color: 0xb3b1ad })
}
const key = {
  _pressed: {},

  LEFT: 65,
  UP: 87,
  RIGHT: 68,
  DOWN: 83,

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
