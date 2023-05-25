import * as THREE from 'three'
import Experience from '../Experience'

export default class Stade {
  constructor() {
    console.log('Jesuis le skatepark')
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    //Setup
    this.resource = this.resources.items.stadeModel

    this.setModel()
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Stade')
      this.setDebug()
    }
    console.log(this.model)
  }

  setModel() {
    this.model = this.resource.scene
    // this.model.scale.set(0.5, 0.5, 0.5)
    this.model.rotation.y = -Math.PI / 2
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })

    const box = new THREE.BoxHelper(this.model, 0xffff00)
    this.scene.add(box)
  }

  setDebug() {
    this.debugFolder.add(this.resource.scene.position, 'x', -10, 10, 0.1).name('Stade X')
    this.debugFolder.add(this.resource.scene.position, 'y', -10, 10, 0.1).name('Stade Y')
    this.debugFolder.add(this.resource.scene.position, 'z', -10, 120, 0.1).name('Stade Z')
  }
}
