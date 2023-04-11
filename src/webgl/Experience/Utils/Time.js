import Experience from '@/webgl/Experience/Experience'
import EventEmitter from './EventEmitter'
import MittInstance from '@/core/lib/MittInstance'

export default class Time extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.experience = new Experience()

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.trigger('tick')
    MittInstance.emit('tickFromEmit')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}
