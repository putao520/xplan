import { Sprite, SpriteMaterial } from 'three'
import { makeTextSprite } from '@/assets/js/utils'
import { PROVINCELOCATIONS } from '@/assets/js/constants'
// import { CountryData } from '@/assets/js/worldlocation/world'
/*
export function createLocationSprite (location) {
  let spriteMaterial = new SpriteMaterial({
    // map: getTexture(location.imageName),
    // map: new CanvasTexture(generateSprite(location.name)),
    map: makeTextSprite(location.name, {fontsize: 20, textColor: {r: 255.0, g: 255.0, b: 255.0, a: 1.0}}),
    color: 0xffffff,
    fog: true
  })

  // let spriteMaterial = new CanvasTexture(makeTextSprite(location.name, {fontsize: 50, textColor: {r: 0.0, g: 0.0, b: 0.0, a: 1.0}}))
  let sprite = new Sprite(spriteMaterial)
  // sprite.position.set(location.position[0], location.position[1], location.position[2])
  sprite.scale.set(1.0, 1.0, 1.0)
  // sprite.scale.set(5.0, 5.0, 10.0)
  return sprite
}
*/

export function createLocationSprite (location, fontSize) {
  let spriteMaterial = new SpriteMaterial({
    map: makeTextSprite(location.name, {fontsize: fontSize || 20, textColor: {r: 255.0, g: 255.0, b: 255.0, a: 1.0}}),
    color: 0xffffff,
    fog: true
  })
  let sprite = new Sprite(spriteMaterial)
  sprite.position.set(location.position[0], location.position[1], location.position[2])
  // sprite.scale.set(1.0, 1.0, 1.0)
  return sprite
}

export function getProvinceLocation (country, province) {
  if (PROVINCELOCATIONS.hasOwnProperty(country)) { // 国家存在
    return PROVINCELOCATIONS[country][province]
  }
  return PROVINCELOCATIONS['China']
}
