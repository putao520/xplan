import { TextureLoader, Texture } from 'three'
import { IMAGE_URLS } from '@/assets/js/constants'
const THREE = require('three')

let loader = new TextureLoader()
loader.crossOrigin = ''

export function getCanvasImage (image, width, height) {
  let canvas = document.createElement('canvas')
  let context = null
  canvas.width = width || image.naturalWidth
  canvas.height = height || image.naturalHeight
  context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)
}

export function generateSprite (text) {
  var canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  var context = canvas.getContext('2d')
  context.beginPath()
  context.font = '50px Microsoft YaHei'
  context.fillStyle = 'white'
  context.fillText(text, 0, 50)
  // context.fill()
  // context.stroke()
  return canvas
}

export function getTexture (imageName) {
  /* let image = (window.loader && window.loader.resources[imageName])
    ? window.loader.resources[imageName].data
    : null
  let imageURL = IMAGE_URLS[imageName]

  if (image) {
    let isJPEG = imageURL.endsWith('.jpg') || imageURL.endsWith('.jpeg')
    let texture = new Texture()
    texture.image = image
    texture.format = isJPEG ? RGBFormat : RGBAFormat
    return texture
  } else {
    return loader.load(imageURL)
  } */

  return loader.load(IMAGE_URLS[imageName])
}

export function isSamePosition (position1, position2, accuracy = 0.01) {
  return Math.abs(position1.x - position2.x) < accuracy && Math.abs(position1.y - position2.y) < accuracy && Math.abs(position1.z - position2.z) < accuracy
}

/**
 * 创建永远面向相机的2D文字
 * */
export function makeTextSprite (message, parameters) {
  if (parameters === undefined) parameters = {}
  var fontface = parameters.hasOwnProperty('fontface') ? parameters['fontface'] : 'Microsoft YaHei'
  var fontsize = parameters.hasOwnProperty('fontsize') ? parameters['fontsize'] : 18
  var borderThickness = parameters.hasOwnProperty('borderThickness') ? parameters['borderThickness'] : 4
  var textColor = parameters.hasOwnProperty('textColor') ? parameters['textColor'] : { r: 0, g: 0, b: 0, a: 1.0 }

  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  context.font = fontsize + 'px ' + fontface
  context.fillStyle = 'rgba(' + textColor.r + ', ' + textColor.g + ', ' + textColor.b + ', 1.0)'

  /*
  var textWidth = textSize(fontsize, fontface, message)
  20 = 64
  15 = 128
  */
  canvas.height = canvas.width = fontsize * 3.2

  context.fillStyle = 'white'
  context.fillText(message, borderThickness, fontsize + borderThickness)

  var texture = new Texture(canvas)
  texture.needsUpdate = true
  return texture
}

export function lglt2xyz (longitude, latitude, radius) {
  var lg = THREE.Math.degToRad(longitude)
  var lt = THREE.Math.degToRad(latitude)
  var y = radius * Math.sin(lt)
  var temp = radius * Math.cos(lt)
  var x = temp * Math.sin(lg)
  var z = temp * Math.cos(lg)

  /*
  var x = radius * Math.cos(lt) * Math.cos(lg)
  var y = radius * Math.cos(lt) * Math.sin(lg)
  var z = radius * Math.sin(lt)
  */
  return {x: x, y: y, z: z}
}
/*
function textSize (fontSize, fontFamily, text) {
  var span = document.createElement('span')
  var result = {}
  result.width = span.offsetWidth
  result.height = span.offsetHeight
  span.style.visibility = 'hidden'
  span.style.fontSize = fontSize
  span.style.fontFamily = fontFamily
  span.style.display = 'inline-block'
  document.body.appendChild(span)
  if (typeof span.textContent !== 'undefined') {
    span.textContent = text
  } else {
    span.innerText = text
  }
  result.width = parseFloat(window.getComputedStyle(span).width) - result.width
  result.height = parseFloat(window.getComputedStyle(span).height) - result.height
  return result
}
*/
