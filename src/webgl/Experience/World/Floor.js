import * as THREE from 'three'
import Experience from '../Experience'

export default class Floor {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    var gridHelper = new THREE.GridHelper(100, 3000)
    // this.scene.add(gridHelper)

    this.setGeometry()
    this.setTextures()
    this.setMaterial()
    this.setMesh()
  }
  setGeometry() {
    // this.geometry = new THREE.CircleGeometry(5, 64)
    this.geometry = new THREE.PlaneGeometry(5, 1000)
  }
  setTextures() {
    this.textures = {}

    this.textures.color = this.resources.items.floorColorTexture
    this.textures.color.encoding = THREE.sRGBEncoding
    this.textures.color.repeat.set(10, 100)
    this.textures.color.wrapS = THREE.RepeatWrapping
    this.textures.color.wrapT = THREE.RepeatWrapping
  }
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
    })
  }
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -Math.PI * 0.5
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}
