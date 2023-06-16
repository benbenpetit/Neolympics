import * as THREE from 'three'
import Experience from '../Experience'
import mittInstance from '@/core/lib/MittInstance'
import { gsap } from 'gsap'

export default class Floor {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    // this.scene.add(gridHelper)

    this.modelVelocity = new THREE.Vector3(0, 0, 0)

    this.setGeometry()
    this.setTextures()
    this.setMaterial()
    this.setMesh()
    this.setMittActions()
  }
  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(3, 10)
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
    // this.material = new THREE.MeshStandardMaterial({
    //   map: this.textures.color,
    // })
  }
  setMittActions() {
    mittInstance.on('Start Skate Animation', () => {
      gsap.to(this.modelVelocity, {
        z: -0.02777 * 4,
        duration: 0,
      })
    })

    mittInstance.on('Start Figure Game', () => {
      gsap.to(this.modelVelocity, {
        z: 0,
        duration: 0,
        ease: 'Power3.easeOut',
      })
    })
    mittInstance.on('Skate Figure Anim 3D', () => {
      gsap.to(this.modelVelocity, {
        z: -0.02777 * 4,
        duration: 0,
      })
    })
  }
  setMesh() {
    var colors = [0xea4050, 0x3656ff, 0xfff965]
    this.floor = new THREE.Group()
    for (let i = 0; i < 45; i++) {
      this.mesh = new THREE.Mesh(
        this.geometry,
        new THREE.MeshStandardMaterial({
          color: colors[i % 3],
        }),
      )
      this.mesh.rotation.x = -Math.PI * 0.5
      this.mesh.receiveShadow = true
      this.mesh.position.z = i * 10 + 5
      this.floor.add(this.mesh)
    }
    this.scene.add(this.floor)
    console.log(this.floor.position)
  }
  update() {
    this.floor.position.add(this.modelVelocity)
  }
}
