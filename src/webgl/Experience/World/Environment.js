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
      this.debugFolder = this.debug.ui.addFolder('Environment').open()
      this.parameters = {
        sunLightColor: 0xfff0c2,
      }
    }

    // Setup
    this.setSunLight()
    this.setEnvironmentMap()
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#FFF0C2', 1)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.camera.near = 0.1
    this.sunLight.shadow.camera.top = 1.5
    this.sunLight.shadow.camera.right = 1
    this.sunLight.shadow.camera.bottom = -0.5
    this.sunLight.shadow.camera.left = -1
    this.sunLight.shadow.mapSize.width = 1024
    this.sunLight.shadow.mapSize.height = 1024

    this.sunLight.intensity = 1
    this.sunLight.target = this.experience.world.skater.model
    this.sunLight.position.copy(new THREE.Vector3(-2, 4, -26.5))
    console.log(this.sunLight.shadow.camera)
    const helper = new THREE.CameraHelper(this.sunLight.shadow.camera)
    this.scene.add(helper)
    this.scene.add(this.sunLight)

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, 'intensity', 0, 10, 0.01)
        .name('sunLightIntensity')
      this.debugFolder.add(this.sunLight.position, 'x', -200, 200, 0.1).name('sunLightX')
      this.debugFolder.add(this.sunLight.position, 'y', -200, 200, 0.1).name('sunLightY')
      this.debugFolder.add(this.sunLight.position, 'z', -200, 200, 0.1).name('sunLightZ')
      this.debugFolder
        .addColor(this.parameters, 'sunLightColor')
        .name('sunLightColor')
        .onChange(() => {
          this.sunLight.color.set(this.parameters.sunLightColor)
        })
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {}
    this.environmentMap.intensity = 1
    this.environmentMap.texture = this.resources.items.environmentMapTexture
    this.environmentMap.texture.encoding = THREE.sRGBEncoding

    this.scene.environment = this.environmentMap.texture
    this.scene.background = this.environmentMap.texture

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
