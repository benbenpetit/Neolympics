export default class MaterialFactory {
  constructor(scene) {
    const defaultMat = new MeshBasicMaterial({ color: 0xff0099 })
    this.materials = {
      default: defaultMat,
    }
  }

  getMaterial(name) {
    let materialName = 'default'
    switch (name) {
      default:
        break
    }

    if (materialName === 'default') {
      console.error('missing material for ', name)
    }

    if (!hasProperty(this.materials, materialName)) {
      this.createMaterial(materialName)
    }
    return this.materials[materialName]
  }

  createMaterial(name) {
    let material = this.materials.default
    switch (name) {
      default:
        break
    }

    material.name = name
    this.materials[name] = material
  }
  getMaterialByName(name) {
    if (!hasProperty(this.materials, name)) {
      this.createMaterial(name)
    }
    return this.materials[name]
  }
}
