<template>
  <div class="c-videoSprite">
    <!-- <video ref="video" :src="videoSrc" class="c-videoSprite__video" webkit-playsinline playsinline></video> -->
    <img ref="video" :src="videoSrc" class="c-videoSprite__video" v-show="isShow" />
    <div ref="ntext" class="c-videoSpriteText">
      <div class="ctitle"><span>{{province}}</span></div>
      <div class="ccaption"><span>激活人数<span class="cnumber">{{lightno}}</span></span></div>
    </div>
  </div>

</template>

<style scoped>
  .ctitle{
    text-align: center;
    font-size: 45px;
    padding-bottom: 10px;
  }
  .ccaption{
    font-size: 18px;
  }
  .cnumber{
    font-size: 38px;
    padding-left: 25px;
  }
</style>

<script>

// import { TextureLoader, SpriteMaterial, Sprite } from 'media-sprite'
import { areaNo, IMAGE_URLS } from '@/assets/js/constants'
import $ from 'jquery'
// const THREE = require('three')
/*
function createImageSprite () {
  let out = {}
  for (let k in areaNo) {
    let max = areaNo[k]
    for (let i = 1; i <= max; i++) {
      let imgName = k + String(i)
      let imgURL = IMAGE_URLS[ imgName ]
      var spriteMap = new THREE.TextureLoader().load(imgURL)
      out[imgName] = new THREE.Sprite(new THREE.SpriteMaterial({ map: spriteMap }))
    }
  }
  return out
}
const imageArray = createImageSprite()
*/
/**
 * 强行修改成image精灵
 * */
export default {
  videoSprite: null,
  data () {
    return {
      province: '',
      lightno: 0,
      isShow: false,
      videoSrc: IMAGE_URLS['q1']
    }
  },

  mounted () {
    this.createVideoSprite()
  },

  methods: {
    createVideoSprite () {
      this.$options.videoSprite = this
    },
    // 根据地理信息获得对应图片
    randomPicture (location) {
      if (location.hasOwnProperty('area') && location.area) {
        let imageName = location.area + String(parseInt(1 + (Math.random() * 100) % areaNo[ location.area ]))
        this.videoSrc = IMAGE_URLS[imageName]
      } else {
        this.videoSrc = IMAGE_URLS['q1']
      }
    },
    showText (fn, pName, ligthno) {
      this.province = pName
      this.lightno = ligthno
      $(this.$refs.ntext).fadeIn(1000, fn)
    },
    hideText (fn) {
      let t = $(this.$refs.ntext)
      t.fadeOut(1000, fn)
    },
    show () {
      // this.$options.controller.hideEarth(() => {
      let o = $(this.$refs.video)
      o.fadeIn(1000, () => {
        // console.log('显示文字')
        o.fadeTo(100, 0.8, () => {
          $('#c-videoSpriteText').fadeIn()
        })
      })
      // })
      // this.$refs.video.style.display = 'block'
      // this.isShow = true
    },
    hide () {
      $(this.$refs.video).fadeOut(1000)
      // this.$refs.video.style.display = 'none'
      // this.isShow = false
    }
  }
}
</script>
