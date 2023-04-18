import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from './Experience'
import { getProject, types } from '@theatre/core'
import studio from '@theatre/studio'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.debug = this.experience.debug
    this.studio = this.experience.studio

    this.setInstance()
    this.setOrbitControls()
    // Debug
    if (this.debug.active) {
      this.setDebug()
    }
    if (this.studio.active) {
    }
    this.setStudio()
  }

  setDebug() {
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
      10000,
    )
    this.instance.position.set(600, 600, -600)
    this.scene.add(this.instance)
  }
  setStudio() {
    // Add to Theatre sheets
    const camera = this.experience.studio.introSkate.object('Camera', {
      position: types.compound({
        x: types.number(this.instance.position.x),
        y: types.number(this.instance.position.y),
        z: types.number(this.instance.position.z),
      }),
    })
    camera.onValuesChange((values) => {
      const { x, y, z } = values.position

      this.instance.position.set(x * Math.PI, y * Math.PI, z * Math.PI)
    })
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
