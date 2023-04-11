import Experience from '@/webgl/Experience/Experience'
import { gsap } from 'gsap'

export default class Animations {
  constructor() {
    this.experience = new Experience()
    this.camera = this.experience.camera

    // window.addEventListener('mousedown', () => {
    //   gsap.to(this.camera.instance.position, {
    //     z: this.experience.world.skater.scene.position.z - 3,
    //     y: this.experience.world.skater.scene.position.y + 3,
    //     x: this.experience.world.skater.scene.position.x + 3,
    //     duration: 3,
    //   })
    // })
  }
}
