import Experience from '@/webgl/Experience/Experience'
import * as THREE from 'three'

export default class Path {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }
  setGeometry() {
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0, 10),
      new THREE.Vector3(-5, 5, 5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, -5, 5),
      new THREE.Vector3(10, 0, 10),
    ])
    this.points = this.curve.getPoints(50)
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points)
  }
  setMaterial() {
    this.material = new THREE.LineBasicMaterial({ color: 0xff0000 })
    this.curveObject = new THREE.Line(this.geometry, this.material)
  }
  setMesh() {
    this.scene.add(this.curveObject)
  }
}
