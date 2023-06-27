import Experience from '@/webgl/Experience/Experience'
import * as THREE from 'three'

export default class MaterialFactory {
  constructor() {
    const defaultMat = new THREE.MeshBasicMaterial({ color: 0xff0099 })
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
      case 'D_Languette':
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
      case 'Marches2':
        materialName = 'Marches2'
        break
      case 'SolBon':
        materialName = 'Sol'
        break
      case 'SolBon001':
        materialName = 'Sol2'
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
        var materialNames = ['PublicShiba', 'PublicRenard', 'PublicGazelle']
        materialName = materialNames[Math.floor(Math.random() * materialNames.length)]
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
      case 'Plane012':
        materialName = '270Slide'
        break
      case 'Plane002_1':
        materialName = 'ShoveIt'
        break
      case 'Module_Shove_It001':
        materialName = 'ShoveIt'
        break
      case 'Barriere_Shoveit':
        materialName = 'ShoveIt'
        break
      case 'Barriere_Shoveit2':
        materialName = 'ShoveIt'
        break
      case 'Module_Shove_It002':
        materialName = 'ShoveIt'
        break
      case 'Module_Shove_It003':
        materialName = 'ShoveIt'
        break
      case 'Module_Back_360':
        materialName = 'Back360'
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
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.shoesTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Chapeau':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.chapeauTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Pantalon':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.pantalonTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Shirt':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.shirtTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Corps':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.corpsTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Tete':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.teteTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      // BOARD
      case 'Skate':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.skateTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      // SKATEPARK
      case 'Marches':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.marchesTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Marches2':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.marches2Texture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Sol':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.solTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Sol2':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.solTexture2,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Barrieres':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.barriereTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Siege':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.siegeTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'PublicShiba':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.shibaTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        material.side = THREE.DoubleSide
        material.transparent = true
        break
      case 'PublicRenard':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.renardTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        material.side = THREE.DoubleSide
        material.transparent = true
        break
      case 'PublicGazelle':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.gazelleTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        material.side = THREE.DoubleSide
        material.transparent = true
        break
      // MODULES
      case 'Kickflip':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.KickflipTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Grindflip':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.GrindFlipTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'Back360':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.Back360Texture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case '270Slide':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.Slide270Texture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
        break
      case 'ShoveIt':
        ;(material = new THREE.MeshStandardMaterial({
          map: this.resources.items.ShoveItTexture,
          envMap: this.resources.items.environmentMapTexture,
          metalness: 0,
          roughness: 1,
        })),
          (material.shadowSide = THREE.DoubleSide)
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
