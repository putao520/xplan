import { lglt2xyz } from '@/assets/js/utils'
import { worldCoordData, nameMap, CountryData } from '@/assets/js/worldlocation/world'
import imageEarth from '@/assets/images/earth4.jpg'
import imageEarthBump from '@/assets/images/earth_bump.jpg'
import imageEarthSpec from '@/assets/images/earth_spec.jpg'
import imageEarthCloud from '@/assets/images/earth_cloud.png'
// import imageNamibia from '@/assets/images/i_namibia.png'
// import imageMariana from '@/assets/images/i_mariana.png'
// import imageGreenland from '@/assets/images/i_greenland.png'
// import imageGalapagos from '@/assets/images/i_galapagos.png'
// import imageAntarcica from '@/assets/images/i_antarctica.png'
import cloud0 from '@/assets/images/kf_cloud_00000.jpg'
import cloud1 from '@/assets/images/kf_cloud_00001.jpg'
import cloud2 from '@/assets/images/kf_cloud_00002.jpg'
import cloud3 from '@/assets/images/kf_cloud_00003.jpg'
import cloud4 from '@/assets/images/kf_cloud_00004.jpg'
import cloud5 from '@/assets/images/kf_cloud_00005.jpg'
import cloud6 from '@/assets/images/kf_cloud_00006.jpg'
import cloud7 from '@/assets/images/kf_cloud_00007.jpg'
import cloud8 from '@/assets/images/kf_cloud_00008.jpg'
import cloud9 from '@/assets/images/kf_cloud_00009.jpg'
import cloud10 from '@/assets/images/kf_cloud_00010.jpg'
import cloud11 from '@/assets/images/kf_cloud_00011.jpg'
import cloud12 from '@/assets/images/kf_cloud_00012.jpg'
import meteor from '@/assets/images/bg_meteor.png'
import wxShareImg from '@/assets/images/wx_share_img.png'
// import videoSprite from '@/assets/videos/video_sprite.mp4'
// import audioSprite from '@/assets/sounds/music_sprite.mp3'
// import backgroundAudio from '@/assets/sounds/music_bg.mp3'

import d1 from '@/assets/images/d1.jpg'
import d2 from '@/assets/images/d2.jpg'
import n1 from '@/assets/images/n1.jpg'
import n2 from '@/assets/images/n2.jpg'
import x1 from '@/assets/images/x1.jpg'
import x2 from '@/assets/images/x2.jpg'
import x3 from '@/assets/images/x3.jpg'
import b1 from '@/assets/images/b1.jpg'
import b2 from '@/assets/images/b2.jpg'
import z1 from '@/assets/images/z1.jpg'
import z2 from '@/assets/images/z2.jpg'
import z3 from '@/assets/images/z3.jpg'
import q1 from '@/assets/images/q1.jpg'

export const PAGE_WIDTH = 375
export const PAGE_HEIGHT = 600

export const MEDIA_URLS = {
  // videoSprite
  // audioSprite,
  // backgroundAudio
}

export const IMAGE_URLS = {
  earth: imageEarth,
  earthBump: imageEarthBump,
  earthSpec: imageEarthSpec,
  earthCloud: imageEarthCloud,
  // iNambia: imageNamibia,
  // iMariana: imageMariana,
  // iGreenland: imageGreenland,
  // iGalapagos: imageGalapagos,
  // iAntarcica: imageAntarcica,
  cloud0,
  cloud1,
  cloud2,
  cloud3,
  cloud4,
  cloud5,
  cloud6,
  cloud7,
  cloud8,
  cloud9,
  cloud10,
  cloud11,
  cloud12,
  meteor,
  wxShareImg,
  // 中国地区图片和国际图片
  d1,
  d2,
  n1,
  n2,
  x1,
  x2,
  x3,
  b1,
  b2,
  z1,
  z2,
  z3,
  q1
}
export const areaNo = {
  d: 2,
  n: 2,
  x: 3,
  b: 2,
  z: 3,
  q: 1
}
/*
export const LOCATIONS = [{
  name: 'namibia',
  coord: [-19.2, 14.11666667], // 19° 12' S, 13° 67' E
  position: [4.6, -1.29, -2.42],
  cameraFarPosition: [-20.03, 13.47, -14.61],
  cameraNearPosition: [-3.54, 2.38, -2.58],
  imageName: 'iNambia',
  coordSpriteIndex: 4,
  videoSprite: [10.80, 19.10],
  soundSprite: [0, 10.057142857142857]
}, {
  name: 'mariana',
  coord: [18.25, 142.81666667], // 17° 75' N, 142° 49' E
  position: [-4.390, 2.660, -2.410],
  cameraFarPosition: [26.46, -6.94, -9.96],
  cameraNearPosition: [4.52, -1.30, -1.63],
  imageName: 'iMariana',
  coordSpriteIndex: 3,
  videoSprite: [2.80, 8.40],
  soundSprite: [24, 34.10938775510204]
}, {
  name: 'greenland',
  coord: [72.16666667, -43], // 71° 70' N, 42° 60' W
  position: [1.880, 5.09, 0.89],
  cameraFarPosition: [7.24, 26.52, 7.06],
  cameraNearPosition: [1.30, 4.66, 1.24],
  imageName: 'iGreenland',
  coordSpriteIndex: 2,
  videoSprite: [40.20, 47.80],
  soundSprite: [48, 58.10938775510204]
}, {
  name: 'galapagos',
  coord: [1.33333333, -91.15], // 01° 20' N, 90° 69' W
  position: [0.550, 0.024, 5.39],
  cameraFarPosition: [-0.60, 0.14, 28.21],
  cameraNearPosition: [-0.10, 0.024, 4.99],
  imageName: 'iGalapagos',
  coordSpriteIndex: 1,
  videoSprite: [22.00, 37.43],
  soundSprite: [12, 22.057142857142857]
}, {
  name: 'antarctica',
  coord: [-77.96666667, -155.63333333], // 77° 58' S, 155° 38' W
  position: [-1.32, -5.05, 0.98],
  cameraFarPosition: [-7.88, -27.00, 1.87],
  cameraNearPosition: [-1.39, -4.75, 0.33],
  imageName: 'iAntarcica',
  coordSpriteIndex: 0,
  videoSprite: [50.90, 69.00],
  soundSprite: [36, 46.05714285714286]
}]
*/

function outData (name, p, h, area, z, farZ, nearZ) {
  let xyz = lglt2xyz(p, h, z || 5.5)
  let farXYZ = lglt2xyz(p, h, farZ || 26)
  let nearXYZ = lglt2xyz(p, h, nearZ || 15)
  return {
    name: name,
    coord: [p, h],
    position: [ xyz.x, xyz.y, xyz.z ],
    cameraFarPosition: [ farXYZ.x, farXYZ.y, farXYZ.z ],
    cameraNearPosition: [ nearXYZ.x, nearXYZ.y, nearXYZ.z ],
    area: area
  }
}

function loadWorldLocations () {
  let out = {}
  worldCoordData.forEach(location => {
    for (let k in nameMap) {
      if (nameMap[k] === location.name) {
        location['ename'] = k
        break
      }
    }
    out[location['ename']] = outData(location.name, location.value[0] + 93, location.value[1] - 3)
  })
  return out
}

function loadProvinceLocations () {
  let out = {}
  for (let cName in CountryData) {
    let newProvince = {}
    let pArray = CountryData[cName]
    for (let pName in pArray) {
      let v = pArray[pName]
      newProvince[v.name] = outData(v.name, v.value[0] + 92.5, v.value[1] - 2.5, v.area, undefined, 26, 8)
    }
    out[ cName ] = newProvince
  }
  return out
}
// 根据国家JSON和省份JSON,生成treelist可用json
function loadTreeJson () {
  let out = {}
  for (let k in nameMap) {
    let o = {value: nameMap[k]}
    if (CountryData.hasOwnProperty(k)) {
      let p = CountryData[k]
      let childNode = {}
      for (let i = 0; i < p.length; i++) {
        let v = p[i]
        childNode[v.name] = v.name
      }
      o['child'] = childNode
    }
    out[k] = o
  }
  return out
}

export const LOCATIONS = loadWorldLocations() // 生成世界地图map
export const PROVINCELOCATIONS = loadProvinceLocations() // 生成省份地图map
export const TREEJSON = loadTreeJson()  // 生成世界和省份地图

