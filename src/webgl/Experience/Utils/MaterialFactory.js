import * as THREE from 'three'

export default class MaterialFactory {
  constructor() {
    const defaultMat = new MeshBasicMaterial({ color: 0xff0099 })
    this.materials = {
      default: defaultMat,
    }
  }

  getMaterial(name) {
    let materialName = 'default'
    switch (name) {
      case 'Yuto':
        materialName = 'Chaussure'
        break
      case 'D_CHAUSSURE':
        materialName = 'Chaussure'
        break
      case 'D_Coque001':
        materialName = 'Chaussure'
        break
      case 'D_Lacet001':
        materialName = 'Chaussure'
        break
      case 'D_Nike001':
        materialName = 'Chaussure'
        break
      case 'D_Semelle001':
        materialName = 'Chaussure'
        break
      case 'G_CHAUSSURE':
        materialName = 'Chaussure'
        break
      case 'G_Coque001':
        materialName = 'Chaussure'
        break
      case 'G_CHAUSSURE':
        materialName = 'Chaussure'
        break
      case 'G_Lacet001':
        materialName = 'Chaussure'
      case 'G_Languette001':
        materialName = 'Chaussure'
        break
      case 'G_Nike001':
        materialName = 'Chaussure'
        break
      case 'G_Semelle001':
        materialName = 'Chaussure'
        break
      case 'Chapeau004':
        materialName = 'Chapeau'
        break
      case 'Pantalon004':
        materialName = 'Pantalon'
        break
      case 'Shirt003':
        materialName = 'Shirt'
        break
      case 'Tete002':
        materialName = 'Corps'
        break
      case 'CorpsCoupe001':
        materialName = 'Corps'
        break

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
      case 'Chaussure':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.shoesTexture,
        })
        break
      case 'Chapeau':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.chapeauTexture,
        })
        break
      case 'Pantalon':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.pantalonTexture,
        })
        break
      case 'Shirt':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.shirtTexture,
        })
        break
      case 'Corps':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.corpsTexture,
        })
        break
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
