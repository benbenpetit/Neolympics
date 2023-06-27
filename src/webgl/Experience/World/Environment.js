import * as THREE from 'three'
import { MeshStandardMaterial } from 'three'
import Experience from '../Experience'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Environment')
    }

    // Setup
    this.setSunLight()
    this.setEnvironmentMap()
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#FFF0C2', 1)
    // this.sunLight.castShadow = true
    // this.sunLight.shadow.camera.far = 500
    // this.sunLight.shadow.camera.near = 0.5
    // this.sunLight.shadow.mapSize.set(2048, 2048)
    // this.sunLight.shadow.normalBias = 0.05
    this.sunLight.intensity = 1
    this.sunLight.position.set(-0.5, 1, -1.5)
    this.scene.add(this.sunLight)

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, 'intensity')
        .name('sunLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)
      this.debugFolder
        .add(this.sunLight.position, 'x')
        .name('sunLightX')
        .min(-50)
        .max(50)
        .step(0.001)
      this.debugFolder
        .add(this.sunLight.position, 'y')
        .name('sunLightY')
        .min(-50)
        .max(50)
        .step(0.001)
      this.debugFolder
        .add(this.sunLight.position, 'z')
        .name('sunLightZ')
        .min(-50)
        .max(50)
        .step(0.001)
      this.debugFolder
        .add(this.sunLight.shadow.camera, 'far')
        .name('shadowMap')
        .min(0)
        .max(100)
        .step(0.01)
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {}
    this.environmentMap.intensity = 1
    this.environmentMap.texture = this.resources.items.environmentMapTexture
    this.environmentMap.texture.encoding = THREE.sRGBEncoding

    this.scene.environment = this.environmentMap.texture
    this.scene.background = this.environmentMap.texture

    console.log(this.environmentMap)

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.envMap = this.environmentMap.texture
          child.material.envMapIntensity = this.environmentMap.intensity
          child.needsUpdate = true
        }
      })
    }
    this.environmentMap.updateMaterials()

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, 'intensity')
        .name('envMapIntensity')
        .min(0)
        .max(20)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterials)
    }
  }
}
