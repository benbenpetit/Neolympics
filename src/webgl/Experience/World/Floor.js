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
    this.setModules()
    this.setMesh()
    this.setMittActions()
  }
  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 10)
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

  setModules() {
    this.skateModules = []
    Object.keys(this.experience.resources.items).forEach((item) => {
      if (item.includes('skateModule')) {
        this.skateModules.push(this.experience.resources.items[item])
      }
    })
  }

  setMesh() {
    var colors = [0xea4050, 0x3656ff, 0xfff965]
    this.floor = new THREE.Group()
    var module_index = 0
    for (let i = 0; i < 30; i++) {
      if (i % 4 == 0 && i != 0 && module_index <= 1) {
        // console.log('Mod 2 : ', module_index % 2)
        // var module = this.skateModules[module_index % 2].scene
        // module.position.z = i * 10 + 5
        // this.floor.add(module)
        // module_index += 1
      } else {
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
    }
    this.scene.add(this.floor)
  }
  update() {
    this.floor.position.add(this.modelVelocity)
  }
}
