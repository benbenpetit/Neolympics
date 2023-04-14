import Animations from '@/webgl/Experience/World/Animations'
import Catcher from '@/webgl/Experience/World/Catcher'
import Path from '@/webgl/Experience/World/Path'
import * as THREE from 'three'
import Experience from '../Experience'
import Environment from './Environment'
import Floor from './Floor'
import Skater from './Skater'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Wait for ressources
    this.resources.on('ready', () => {
      this.floor = new Floor()
      // Setup
      this.skater = new Skater()
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
  }
}
