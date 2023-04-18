import * as THREE from 'three'
import Experience from '../Experience'
import mittInstance from '@/core/lib/MittInstance'

export default class SkaterLapin {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    //Setup
    this.resource = this.resources.items.skaterLapinModel

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('SkaterLapin')
      this.setDebug()
    }
    this.setModel()
  }

  setModel() {
    this.model = this.resource.scene
    this.group = new THREE.Group()
    this.group.add(this.model)
    this.group.add(this.experience.camera.instance)
    this.model.scale.set(50, 50, 50)
    this.model.position.set(-520, 70, 188)
    console.log(this.model.position)
    this.experience.camera.instance.lookAt(this.model.position)
    console.log(this.experience.camera.instance)
    this.scene.add(this.group)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })

    console.log(this.model)
  }

  setDebug() {
    console.log(this.resource)
    this.debugFolder
      .add(this.resource.scene.position, 'x', -1000, 1000, 0.1)
      .name('Skater X')
    this.debugFolder
      .add(this.resource.scene.position, 'y', -1000, 1000, 0.1)
      .name('Skater Y')
    this.debugFolder
      .add(this.resource.scene.position, 'z', -1000, 1000, 0.1)
      .name('Skater Z')
  }

  update() {
    this.experience.camera.instance.lookAt(this.model.position)
  }
}
