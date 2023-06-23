import Experience from '@/webgl/Experience/Experience'
import EventEmitter from './EventEmitter'
import mittInstance from '@/core/lib/MittInstance'
import { estimateRefreshRate } from '@/webgl/Experience/Utils/Utils'

export default class Time extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.experience = new Experience()
    this.frameRate = (1 / 60) * 1000
    this.timeScale = 0

    window.requestAnimationFrame(() => {
      this.tick()
    })

    estimateRefreshRate()
  }

  tick() {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.delta += this.frameRate - this.delta
    this.delta *= this.timeScale
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.trigger('tick')
    mittInstance.emit('Time tick', { deltaTime: this.delta })

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}
