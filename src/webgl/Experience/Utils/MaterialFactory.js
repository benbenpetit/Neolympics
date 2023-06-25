import Experience from '@/webgl/Experience/Experience'
import * as THREE from 'three'

export default class MaterialFactory {
  constructor() {
    const defaultMat = new THREE.MeshBasicMaterial({ color: 0x888888 })
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.materials = {
      default: defaultMat,
    }
  }

  getMaterial(name) {
    let materialName = 'default'
    switch (name) {
      // SKATER
      case 'Yuto':
        materialName = 'Chaussure'
        break
      case 'D_CHAUSSURE':
        materialName = 'Chaussure'
        break
      case 'D_Coque':
        materialName = 'Chaussure'
        break
      case 'D_Lacet':
        materialName = 'Chaussure'
        break
      case 'D_Nike':
        materialName = 'Chaussure'
        break
      case 'D_Semelle':
        materialName = 'Chaussure'
        break
      case 'G_CHAUSSURE':
        materialName = 'Chaussure'
        break
      case 'G_Coque':
        materialName = 'Chaussure'
        break
      case 'G_Lacet':
        materialName = 'Chaussure'
      case 'G_Languette':
        materialName = 'Chaussure'
        break
      case 'G_Nike':
        materialName = 'Chaussure'
        break
      case 'G_Semelle':
        materialName = 'Chaussure'
        break
      case 'Chapeau':
        materialName = 'Chapeau'
        break
      case 'Pantalon':
        materialName = 'Pantalon'
        break
      case 'Shirt':
        materialName = 'Shirt'
        break
      case 'Tete':
        materialName = 'Tete'
        break
      case 'CorpsCoupe001':
        materialName = 'Corps'
        break
      // BOARD
      case 'Skate_Planche':
        materialName = 'Skate'
        break
      case 'Skate_Roues':
        materialName = 'Skate'
        break
      case 'Skate_Roulements':
        materialName = 'Skate'
        break
      case 'Skate_Trucks_Bas':
        materialName = 'Skate'
        break
      case 'Skate_Trucks_Haut':
        materialName = 'Skate'
        break
      case 'Skate_Vis':
        materialName = 'Skate'
        break
      case 'Skate_Vis_Trucks':
        materialName = 'Skate'
        break

      // SKATEPARK
      case 'Marches':
        materialName = 'Marches'
        break
      case 'Sol':
        materialName = 'Sol'
        break
      case 'Barrieres':
        materialName = 'Barrieres'
        break
      case 'Sieges_Public':
        materialName = 'Siege'
        break
      case 'Sieges_Public_2':
        materialName = 'Siege'
        break
      case 'Public':
        materialName = 'Public'
        break
      // MODULES
      case 'Module_Kickflip':
        materialName = 'Kickflip'
        break
      case 'Module_Grind_Flip':
        materialName = 'Grindflip'
        break
      case 'Cube013':
        materialName = 'Back360'
        break
      case 'Plane002':
        materialName = '270Slide'
        break

      default:
        break
    }

    if (materialName === 'default') {
      console.error('missing material for ', name)
    }

    if (!this.hasProperty(this.materials, materialName)) {
      this.createMaterial(materialName)
    }
    return this.materials[materialName]
  }

  createMaterial(name) {
    let material = this.materials.default
    switch (name) {
      //SKATER
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
      case 'Tete':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.teteTexture,
        })
        break
      // BOARD
      case 'Skate':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.skateTexture,
        })
        break
      // SKATEPARK
      case 'Marches':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.marchesTexture,
        })
        break
      case 'Sol':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.solTexture,
        })
        break
      case 'Barriere':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.barriereTexture,
        })
        break
      case 'Siege':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.siegeTexture,
        })
        break
      case 'Public':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.shibaTexture,
        })
        break
      // MODULES
      case 'Kickflip':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.KickflipTexture,
        })
        break
      case 'Grindflip':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.GrindFlipTexture,
        })
        break
      case 'Back360':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.Back360Texture,
        })
        break
      case '270Slide':
        material = new THREE.MeshLambertMaterial({
          map: this.resources.items.Slide270Texture,
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
  hasProperty(materials, materialName) {
    return materials.hasOwnProperty(materialName)
  }
}
