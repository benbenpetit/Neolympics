import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from './Experience'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.debug = this.experience.debug

    this.setInstance()
    this.setOrbitControls()
    // Debug
    if (this.debug.active) {
      this.setDebug()
    }
  }

  setDebug() {
    console.log(this.instance)
    this.debugFolder = this.debug.ui.addFolder('Camera')
    this.debugFolder.add(this.instance.position, 'x', -10, 10, 0.1).name('Camera X')
    this.debugFolder.add(this.instance.position, 'y', -10, 10, 0.1).name('Camera X')
    this.debugFolder.add(this.instance.position, 'z', -10, 10, 0.1).name('Camera X')
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    )
    this.instance.position.set(0, 10, -10)
    this.scene.add(this.instance)
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }
}
