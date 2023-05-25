import Animations from '@/webgl/Experience/World/Animations'
import * as THREE from 'three'
import Experience from '../Experience'
import Environment from './Environment'
import Floor from './Floor'
import Skatepark from './Skatepark'
import SkaterLapin from './SkaterLapin'
import mittInstance from '@/core/lib/MittInstance'
import Stade from '@/webgl/Experience/World/Stade'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    // Wait for ressources
    this.resources.on('ready', () => {
      this.floor = new Floor()
      // Setup
      // this.skater = new Skater()
      // this.catcher = new Catcher()
      // this.skatepark = new Skatepark()
      this.skater = new SkaterLapin()
      // this.skatepark = new Stade()
      this.environment = new Environment()
      this.animations = new Animations()
    })
  }
  update() {
    if (this.skater) {
      this.skater.update()
    }
    if (this.catcher) {
      this.catcher.update()
    }
    // if (this.skatepark) {
    //   this.skatepark.update()
    // }
  }
}
