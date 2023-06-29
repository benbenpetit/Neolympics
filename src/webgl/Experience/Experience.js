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
import Stats from 'three/examples/jsm/libs/stats.module'
import MaterialFactory from '@/webgl/Experience/Utils/MaterialFactory'

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
    this.sizes = new Sizes(this.canvas)
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Ressources(sources)
    this.materialFactory = new MaterialFactory()
    this.world = new World()
    this.camera = new Camera()
    this.renderer = new Renderer()
    // this.stats = new Stats()
    // this.stats.dom.classList.add('stats-container')
    // document.body.appendChild(this.stats.dom)

    //Sizes resize event
    this.sizes.on('resize', () => {
      this.resize()
    })

    // Time tick event
    mittInstance.on('Time tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    if (this.stats) {
      this.stats.update()
    }
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
