import * as THREE from 'three'
import Experience from '../Experience'
import mittInstance from '@/core/lib/MittInstance'

export default class Skatepark {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.slowmotionFactor = 0.001
    this.debug = this.experience.debug

    //Setup
    this.resource = this.resources.items.skateparkModel

    this.setModel()
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Skatepark')
      this.setDebug()
    }
    this.setAnimation()
  }

  setModel() {
    this.model = this.resource.scene
    this.model.position.set(0, 0.8, 103)
    // this.model.scale.set(0.5, 0.5, 0.5)
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })
  }

  setDebug() {
    this.debugFolder
      .add(this.resource.scene.position, 'x', -10, 10, 0.1)
      .name('Skatepark X')
    this.debugFolder
      .add(this.resource.scene.position, 'y', -10, 10, 0.1)
      .name('Skatepark Y')
    this.debugFolder
      .add(this.resource.scene.position, 'z', -10, 120, 0.1)
      .name('Skatepark Z')
  }

  setAnimation() {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.model)
    this.animation.actions = {}

    this.resource.animations.forEach((animation) => {
      this.animation.actions[animation.name] = this.animation.mixer.clipAction(
        THREE.AnimationClip.findByName(this.resource.animations, animation.name),
      )
      this.animation.actions[animation.name].setLoop(THREE.LoopOnce)
    })
    console.log(this.animation.actions)

    this.animation.play = () => {
      const newAction = this.animation.actions['Plane.056Action.001']

      newAction.reset()
      newAction.play()
    }

    this.animation.mixer.addEventListener('finished', (e) => {
      console.log('Finished')
    })
  }
  update() {
    this.animation.mixer.update(this.time.delta * this.slowmotionFactor)
  }
}
