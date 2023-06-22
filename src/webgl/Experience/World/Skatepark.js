import * as THREE from 'three'
import Experience from '../Experience'

export default class Skatepark {
  constructor() {
    console.log('Skatepark')
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    //Setup
    this.resource = this.resources.items.skatepark

    this.setModel()
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Skatepark')
      this.setDebug()
    }
  }

  setModel() {
    this.model = this.resource.scene
    let box3 = new THREE.Box3().setFromObject(this.model)
    let size = new THREE.Vector3()
    console.log(box3.getSize(size))
    this.model.position.set(0, 0, 0)
    this.model.rotation.y = Math.PI / 2

    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })
  }

  setDebug() {}
}
