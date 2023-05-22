import * as THREE from 'three'
import Experience from '../Experience'
import mittInstance from '@/core/lib/MittInstance'

export default class SkaterLapin {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    //Setup
    this.resource = this.resources.items.skater

    this.setModel()
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('SkaterLapin')
      this.setDebug()
    }
    this.setAnimation()

    this.slowmotionFactor = 0.001
  }

  setModel() {
    this.model = this.resource.scene
    this.model.position.set(0, 0, 0)
    this.model.scale.set(0.5, 0.5, 0.5)

    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })
  }

  setDebug() {
    this.debugFolder.add(this.resource.scene.position, 'x', -10, 10, 0.1).name('Skater X')
    this.debugFolder.add(this.resource.scene.position, 'y', -10, 10, 0.1).name('Skater Y')
    this.debugFolder.add(this.resource.scene.position, 'z', -10, 10, 0.1).name('Skater Z')
  }

  setAnimation() {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.model)
    this.animation.actions = {}

    this.resource.animations.forEach((animation) => {
      this.animation.actions[animation.name] = this.animation.mixer.clipAction(
        THREE.AnimationClip.findByName(this.resource.animations, animation.name),
      )
      if (animation.name != 'P_Cruise' && animation.name != 'Board_Pose') {
        this.animation.actions[animation.name].setLoop(THREE.LoopOnce)
      }
    })
    this.animation.actions.current = this.animation.actions['P_Cruise']
    this.animation.actions.current.play()

    this.animation.play = (name) => {
      const newAction = this.animation.actions[name]
      const oldAction = this.animation.actions.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 0.5)

      setTimeout(() => {
        oldAction.reset()
        oldAction.play()
        oldAction.crossFadeFrom(newAction, 0)
      }, 2000)
    }

    this.animation.mixer.addEventListener('finished', (e) => {
      console.log('FInished')
    })

    // Debug Part
    if (this.debug.active) {
      const debugObject = {
        playOllie: () => {
          // this.animation.actions['Board_Olie'].play()
          // this.animation.actions['P_Olie'].play()
          // this.animation.actions['Board_Olie'].reset()
          // this.animation.actions['P_Olie'].reset()
          this.animation.play('Board_Olie')
          this.animation.play('P_Olie')
        },
        playCruise: () => {
          this.animation.actions['Board_Pose'].play()
          this.animation.actions['P_Cruise'].play()
        },
        playPush: () => {
          // this.animation.actions['Board_Pose'].play()
          // this.animation.actions['P_Push_Stat'].play()
          // this.animation.actions['Board_Pose'].reset()
          // this.animation.actions['P_Push_Stat'].reset()
          this.animation.play('P_Push_Stat')
        },
      }
      this.debugFolder.add(debugObject, 'playOllie')
      this.debugFolder.add(debugObject, 'playCruise')
      this.debugFolder.add(debugObject, 'playPush')
    }

    // document.addEventListener('click', () => {
    //   this.slowmotionFactor == 0.001
    //     ? (this.slowmotionFactor = 0.0001)
    //     : (this.slowmotionFactor = 0.001)
    // })
  }
  update() {
    this.model.position.z = 4 * this.time.elapsed * 0.001
    const oldCamPos = new THREE.Vector3()
    oldCamPos.copy(this.experience.camera.instance.position)

    const modelPosition = this.model.position
    const cameraPosition = new THREE.Vector3()
    cameraPosition.copy(modelPosition)
    cameraPosition.x += 1.5
    cameraPosition.y += 1 + this.model.getObjectByName('Ctrl_Hips').position.y * 0.2
    cameraPosition.z += -1.5

    const cameraTarget = new THREE.Vector3()
    cameraTarget.copy(modelPosition)
    cameraTarget.z += 0.5

    const smoothedCamPos = oldCamPos.lerp(cameraPosition, 0.1)

    this.animation.mixer.update(this.time.delta * this.slowmotionFactor)
    this.experience.camera.instance.position.copy(cameraPosition)
    this.experience.camera.instance.lookAt(cameraTarget)
  }
}
