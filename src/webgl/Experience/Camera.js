import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from './Experience'
import mittInstance from '@/core/lib/MittInstance'
import { gsap } from 'gsap'

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

    mittInstance.on('Start skate intro', () => {
      this.skateIntro()
    })
  }

  setDebug() {
    this.debugFolder = this.debug.ui.addFolder('Camera')
    this.debugFolder.add(this.instance.position, 'x', -10, 10, 0.1).name('Camera X')
    this.debugFolder.add(this.instance.position, 'y', -10, 10, 0.1).name('Camera Y')
    this.debugFolder.add(this.instance.position, 'z', -10, 10, 0.1).name('Camera Z')
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      10000,
    )
    this.instance.position.set(10, 10, -10)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  skateIntro() {
    gsap.to(this.instance.position, {
      x: -2.0000695940107107,
      y: 1.861894166469574,
      z: -3.993039016611874,
      duration: 5,
      onComplete: () => {
        this.experience.world.skater.started = true
        mittInstance.emit('Start tutorial')
      },
    })
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }
}
