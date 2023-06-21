import * as THREE from 'three'
import Experience from '../Experience'
import mittInstance from '@/core/lib/MittInstance'
import { gsap } from 'gsap'
import mitt from 'mitt'

export default class Floor {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.resources = this.experience.resources
    this.figuresInterval = 6
    this.tilesMultiplicator = 3
    // this.scene.add(gridHelper)

    this.setGeometry()
    // this.setTextures()
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
      this.time.timeScale = 1
    })

    mittInstance.on('Before Figure Game', () => {
      this.sloMo = gsap.to(this.time, {
        timeScale: 0.2,
        duration: 2,
        onComplete: () => {
          console.log('Reduction finie')
        },
      })
    })

    mittInstance.on('Start Figure Game', () => {
      // console.log('Figure Game')
      this.time.timeScale = 0
    })
    mittInstance.on('Skate Figure Anim 3D', (data) => {
      if (data.isValid) {
        var animationDuration =
          this.experience.world.skater.animation.actions[data.animation.perso].getClip()
            .duration
        this.figuresInterval = animationDuration
        this.tilesMultiplicator = 1
        gsap.to(this.time, {
          timeScale: 1.5,
          duration: 1,
        })
      } else {
        this.timeScale = 1
        this.floor.position.z -= 10
        mittInstance.emit('Skate Figure Anim 3D End')
      }
    })
    mittInstance.on('Skate Figure Anim 3D End', () => {
      this.figuresInterval = 6
      this.tilesMultiplicator = 3
      gsap.to(this.time, {
        timeScale: 1,
        duration: 1,
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
    // console.log('Rssources items : ', this.experience.resources.items)
  }

  setMesh() {
    var colors = [0xea4050, 0x3656ff, 0xfff965]
    this.floor = new THREE.Group()
    var module_index = 0
    var sol = []
    for (let i = 1; i < 50; i++) {
      if (i % 4 == 0) {
        if (module_index <= 1) {
          var module = this.skateModules[module_index % 2].scene
          module.position.z = (i - 1) * 10 + 5
          this.floor.add(module)
          module_index += 1
          let box3 = new THREE.Box3().setFromObject(module)
          let size = new THREE.Vector3()
          // console.log(box3.getSize(size))
        }
      } else {
        this.mesh = new THREE.Mesh(
          this.geometry,
          new THREE.MeshStandardMaterial({
            color: colors[i % 3],
          }),
        )
        this.mesh.rotation.x = -Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.mesh.position.z = (i - 1) * 10 + 5
        this.floor.add(this.mesh)
      }
      // this.mesh = new THREE.Mesh(
      //   this.geometry,
      //   new THREE.MeshStandardMaterial({
      //     color: colors[i % 3],
      //   }),
      // )
      // this.mesh.rotation.x = -Math.PI * 0.5
      // this.mesh.receiveShadow = true
      // this.mesh.position.z = i * 10 + 5
      // this.floor.add(this.mesh)
    }
    this.scene.add(this.floor)
  }
  update() {
    this.modelVelocity = new THREE.Vector3(
      0,
      0,
      -(10 / this.figuresInterval) *
        (1 / 60) *
        this.time.timeScale *
        this.tilesMultiplicator,
    )
    // console.log(this.modelVelocity)
    this.floor.position.add(this.modelVelocity)
  }
}
