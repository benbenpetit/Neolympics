import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import EventEmitter from './EventEmitter'
import mittInstance from '@/core/lib/MittInstance'

export default class Ressources extends EventEmitter {
  constructor(sources) {
    super()

    // Options
    this.sources = sources

    // Setup
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0
    this.loadingManager = new THREE.LoadingManager(
      // Loaded
      () => {
        setTimeout(() => {
          mittInstance.emit('All ressources loaded')
        }, 1000)
      },

      // Progress
      (itemsUrl, itemsLoaded, itemsTotal) => {
        mittInstance.emit('Ressources loaded', {
          loadingProgress: (itemsLoaded / itemsTotal) * 100,
        })
      },
    )

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    this.loaders.gltfLoader.setDRACOLoader(dracoLoader)
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, (file) => {
          file.colorSpace = THREE.SRGBColorSpace
          file.flipY = false
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      }
    }
  }
  sourceLoaded(source, file) {
    this.items[source.name] = file
    this.loaded++
  }
}
