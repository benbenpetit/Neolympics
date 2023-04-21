import * as THREE from 'three'
import Experience from '../Experience'

export default class Catcher {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    this.direction = { x: null, z: null }

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Catcher')
    }

    //Setup
    this.resource = this.resources.items.catcherModel

    this.setModel()
    this.setAnimation()

    window.addEventListener('keydown', (e) => {
      if (e.repeat) {
        return
      }
      this.animation.actions.walk.reset()
      this.animation.actions.walk.weight = 1
      this.animation.actions.walk.play()
      switch (e.key) {
        case 'ArrowUp':
          this.direction.z = 1
          break
        case 'ArrowDown':
          this.direction.z = -1
          break
        case 'ArrowLeft':
          this.direction.x = 1
          break
        case 'ArrowRight':
          this.direction.x = -1
          break
        default:
          break
      }
    })
    window.addEventListener('keyup', () => {
      this.animation.actions.walk.fadeOut(1)
      this.direction.x = 0
      this.direction.z = 0
    })
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
    this.animation.actions.walk = this.animation.mixer.clipAction(
      this.resource.animations[0],
    )

    this.animation.actions.current = this.animation.actions.walk
    // this.animation.actions.current.play()

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
      this.debugObject = {
        playWalk: () => {
          this.animation.play('walk')
        },
        playIdle: () => {
          this.animation.actions.current.fadeOut(5)
        },
      }
      this.debugFolder.add(this.debugObject, 'playWalk')
      this.debugFolder.add(this.debugObject, 'playIdle')
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001)

    const relativeCameraOffset = new THREE.Vector3(3, 4, -5)
    var cameraOffset = relativeCameraOffset.applyMatrix4(this.model.matrixWorld)
    if (this.direction.x != 0 || this.direction.z != 0) {
      this.model.position.x += this.direction.x * 0.1
      this.model.position.z += this.direction.z * 0.1
    }

    // Définition de la position et de la direction de la caméra
    this.experience.camera.instance.position.copy(cameraOffset)
    this.experience.camera.instance.lookAt(this.model.position)
  }
}
