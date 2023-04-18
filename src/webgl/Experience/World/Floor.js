import * as THREE from 'three'
import Experience from '../Experience'

export default class Floor {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    var gridHelper = new THREE.GridHelper(100, 100)
    this.scene.add(gridHelper)

    this.setGeometry()
    this.setTextures()
    this.setMaterial()
    this.setMesh()
  }
  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64)
  }
  setTextures() {
    this.textures = {}

    this.textures.color = this.resources.items.floorColorTexture
    this.textures.color.encoding = THREE.sRGBEncoding
    this.textures.color.repeat.set(10, 10)
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
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(-2.5, 0, 2.5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2.5, 0, -2.5),
      new THREE.Vector3(5, 0, 0),
    ])
    const points = curve.getPoints(50)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const material = new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth: 50,
      linecap: 'round',
      linejoin: 'round',
    })

    // Create the final object to add to the scene
    const splineObject = new THREE.Line(geometry, material)
    this.scene.add(this.mesh)
    this.scene.add(splineObject)
  }
}
