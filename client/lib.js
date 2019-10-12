export class Player {
  constructor({
    name,
    color,
    x,
    vx,
    vy,
    y,
    r,
    speed,
    size,
    shootspeed,
    id,
    hp
  }) {
    this.name = name
    this.color = color
    this.x = x
    this.y = y
    this.r = r
    this.vx = vx || 0
    this.vy = vy || 0
    this.id = id
    this.speed = speed
    this.main = new THREE.Group()
    this.tank = new THREE.Mesh(
      geometry.player,
      new THREE.MeshBasicMaterial({ color })
    )
    this.turret = new THREE.Mesh(geometry.turret, material.turret)
    this.hpbar = new THREE.Mesh(
      geometry.hpbar,
      new THREE.MeshBasicMaterial({ color: `hsl(${hp},69%,54%)` })
    )
    this.bullets = bullets
    this.shootspeed = shootspeed
    this.size = size
  }
  update() {
    this.x += this.vx
    this.y += this.vy
  }
  draw() {}
  move() {}
}
export const game = {
  players: {},
  width: window.innerWidth,
  height: window.innerHeight,
  scene: new THREE.Scene(),
  camera: new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    1,
    1000
  ),
  renderer: new THREE.WebGLRenderer({ antialias: true })
}
export const geometry = {
  hpbar: new THREE.PlaneGeometry(50, 5),
  player: new THREE.CircleGeometry(25, 8),
  turret: new THREE.PlaneGeometry(16, 20),
  bullet: new THREE.CircleGeometry(5, 8)
}
export const material = {
  turret: new THREE.MeshBasicMaterial({ color: 0xb3b1ad })
}
export const key = {
  _pressed: {},

  LEFT: 65,
  UP: 87,
  RIGHT: 68,
  DOWN: 83,

  isDown: (keyCode) => {
    return key._pressed[keyCode] ? 1 : 0
  },

  onKeyDown: (event) => {
    key._pressed[event.keyCode] = true
  },

  onKeyUp: (event) => {
    delete key._pressed[event.keyCode]
  }
}

export const addPlayer = (player) => {
  let p = new Player(player)
  p.main.add(p.tank)
  p.main.add(p.turret)
  p.main.add(p.hpbar)
  game.scene.add(p.main)

  game.players[player.id] = p
}

export const socket = io()
