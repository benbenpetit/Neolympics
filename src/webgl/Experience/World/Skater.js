import * as THREE from 'three'
import Experience from '../Experience'

export default class Skater {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Skater')
    }

    //Setup
    this.resource = this.resources.items.skaterModel

    this.setModel()
    this.setAnimation()
    console.log(this.experience.camera)
  }

  setModel() {
    this.model = this.resource.scene
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })
  }

  setAnimation() {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.model)
    this.animation.actions = {}
    this.animation.actions.jumping = this.animation.mixer.clipAction(
      this.resource.animations[0],
    )
    this.animation.actions.jumping.repetitions = 1
    this.animation.actions.pushing = this.animation.mixer.clipAction(
      this.resource.animations[1],
    )
    this.animation.actions.rolling = this.animation.mixer.clipAction(
      this.resource.animations[2],
    )
    this.animation.actions.staying = this.animation.mixer.clipAction(
      this.resource.animations[3],
    )

    this.animation.actions.current = this.animation.actions.staying
    this.animation.actions.current.play()

    this.animation.play = (name) => {
      const newAction = this.animation.actions[name]
      const oldAction = this.animation.actions.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 1)

      this.animation.actions.current = newAction
    }

    // Debug Part
    if (this.debug.active) {
      const debugObject = {
        playJump: () => {
          this.animation.play('jumping')
        },
        playPush: () => {
          this.animation.play('pushing')
        },
        playRoll: () => {
          this.animation.play('rolling')
        },
        playStay: () => {
          this.animation.play('staying')
        },
      }
      this.debugFolder.add(debugObject, 'playJump')
      this.debugFolder.add(debugObject, 'playPush')
      this.debugFolder.add(debugObject, 'playRoll')
      this.debugFolder.add(debugObject, 'playStay')
    }
  }
  update() {
    this.model.position.x = 3 * Math.cos(this.time.elapsed * 0.001)
    this.model.position.y = Math.abs(Math.sin(this.time.elapsed * 0.002 + 3))
    this.model.position.z = 4 * Math.sin(this.time.elapsed * 0.001)
    this.animation.mixer.update(this.time.delta * 0.001)

    const relativeCameraOffset = new THREE.Vector3(3, 4, -5)
    var cameraOffset = relativeCameraOffset.applyMatrix4(this.model.matrixWorld)

    // Définition de la position et de la direction de la caméra
    this.experience.camera.instance.position.copy(cameraOffset)
    this.experience.camera.instance.lookAt(this.model.position)
  }
}
