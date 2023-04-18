import * as THREE from 'three'
import Camera from './Camera'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Renderer from './Renderer'
import World from './World/World'
import Ressources from './Utils/Ressources'
import sources from './sources'
import Debug from './Utils/Debug'
import mittInstance from '@/core/lib/MittInstance'
import Theatre from '@/webgl/Experience/Utils/Theatre'

let instance = null

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance
    }
    instance = this
    //Global access
    window.experience = this

    // Options
    this.canvas = canvas

    // Setup
    this.debug = new Debug()
    this.studio = new Theatre()
    this.sizes = new Sizes(this.canvas)
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Ressources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    //Sizes resize event
    this.sizes.on('resize', () => {
      this.resize()
    })

    // Time tick event
    this.time.on('tick', () => {
      // this.update()
    })

    mittInstance.on('tickFromEmit', () => {
      this.update()
    })
    mittInstance.on('bntStart', () => {
      console.log('Bouton Démarrer cliqué')
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key]
          // Test if there is a dispose function
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()
    if (this.debug.active) {
      this.debug.ui.destroy()
    }
  }
}
