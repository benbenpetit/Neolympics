import * as core from '@theatre/core'
import studio from '@theatre/studio'
import projectState from '/src/theatre/state.json'
import mittInstance from '@/core/lib/MittInstance'

export default class Theatre {
  constructor() {
    this.active = window.location.hash === '#theatre'
    this.studio = studio
    this.studio.initialize()
    this.project = core.getProject('Jeo-NO', { state: projectState })
    this.introSkate = this.project.sheet('Skate Intro')
    if (this.active) {
      this.studio.ui.restore()
    } else {
      this.studio.ui.hide()
    }
    this.setAnimations()
  }
  setAnimations() {
    mittInstance.on('Start skate intro', () => {
      this.introSkate.sequence.play({ iterationCount: 1 })
    })
  }
}
