import * as THREE from 'three'
import Experience from '../Experience'

export default class Skatepark {
  constructor() {
    console.log('Skatepark')
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.materialFactory = this.experience.materialFactory

    //Setup
    this.resource = this.resources.items.skatepark

    this.setModel()
    this.setMaterials()
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
    this.model.position.set(0, 0.2, 84.5)
    this.model.scale.set(1, 1, 1)
    this.model.rotation.y = (3 * Math.PI) / 2

    // this.scene.add(this.model)

    const p = new Array()

    this.model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
      if (child.name.includes('Plane')) {
        p.push(child)
        // this.model.remove(child)
      }
    })

    for (let i = 0; i < p.length; i++) {
      this.model.remove(p[i])
    }
  }

  setMaterials() {
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // console.log(child.name)
        if (child.name.includes('Plane')) {
          // child.material = this.materialFactory.getMaterial('Public')
        } else {
          child.material = this.materialFactory.getMaterial(child.name)
        }
      }
    })
  }

  setDebug() {
    this.debugFolder
      .add(this.resource.scene.position, 'z', 0, 100, 0.1)
      .name('SkatePark Z')
    this.debugFolder
      .add(this.resource.scene.position, 'y', 0, 10, 0.001)
      .name('SkatePark Z')
  }
}
