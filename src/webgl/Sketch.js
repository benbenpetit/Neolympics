import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { fragShader } from './shaders/basic.frag.js'
import { vertShader } from './shaders/basic.vert.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene()

    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xeeeeee, 1)
    this.renderer.useLegacyLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.001, 1000)
    this.camera.position.set(10, 6, 10)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.time = 0

    const axesHelper = new THREE.AxesHelper(5)
    this.scene.add(axesHelper)

    this.gltfLoader = new GLTFLoader()

    this.clock = new THREE.Clock()

    this.addLights()
    this.addObjects()
    this.loadModels()
    this.resize()
    this.render()
    this.setupResize()
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height

    this.camera.updateProjectionMatrix()
  }

  addObjects() {
    let that = this

    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: vertShader,
      fragmentShader: fragShader,
    })
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

    this.geometry = new THREE.PlaneGeometry(10, 10)

    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.plane.rotation.x = -Math.PI * 0.5
    // this.scene.add(this.plane)

    let tex = new THREE.TextureLoader().load('/textures/concrete.jpg')
    tex.anisotropy = 32
    tex.repeat.set(1000, 1000)
    tex.wrapT = THREE.RepeatWrapping
    tex.wrapS = THREE.RepeatWrapping
    let geo = new THREE.PlaneGeometry(10000, 10000)
    let mat = new THREE.MeshLambertMaterial({
      map: tex,
    })
    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(0, 0, 0)
    mesh.rotation.set(Math.PI / -2, 0, 0)
    this.scene.add(mesh)
  }

  loadModels() {
    this.gltfLoader.load('/models/SkateAnims.glb', (gltf) => {
      this.scene.add(gltf.scene)
      this.skater = gltf.scene
      this.mixer = new THREE.AnimationMixer(gltf.scene)
      const clips = gltf.animations
      const clip = THREE.AnimationClip.findByName(clips, 'Pushing')
      const action = this.mixer.clipAction(clip)
      action.play()
    })
  }

  addLights() {
    const ligth1 = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(ligth1)
  }

  render() {
    // this.material.uniforms.time.value = this.time
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta())
    }
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}
