import * as THREE from 'three'
import Experience from '../Experience'
import Environment from './Environment'
import Floor from './Floor'
import Skatepark from './Skatepark'
import SkaterLapin from './SkaterLapin'
import mittInstance from '@/core/lib/MittInstance'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    // Wait for ressources
    this.resources.on('ready', () => {
      // Setup
      this.skater = new SkaterLapin()
      // this.skatepark = new Skatepark()
      this.floor = new Floor()
      this.environment = new Environment()
    })
  }
  update() {
    if (this.skater) {
      this.skater.update()
    }
    if (this.floor) {
      this.floor.update()
    }
  }
}
