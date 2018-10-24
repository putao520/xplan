<template>
  <page>
    <div :class="{'c-show': true, 'low-position': isEnd}">
      <transition name="fade">
        <show-cover v-show="!isEnd" :show-tips="showTips" :show-coord="showCoord" :coord-index="coordIndex"></show-cover>
      </transition>

      <show-end-cover v-if="isEnd" @back="handleBack"></show-end-cover>
      <show-earth ref="earth"></show-earth>
      <show-clouds ref="cloudSprite"></show-clouds>
      <show-video-sprite ref="videoSprite"></show-video-sprite>
      <show-audio-sprite ref="audioSprite" @spriteend="handleAudioSpriteEnd"></show-audio-sprite>
      <transition name="fade">
        <show-actions v-show="showAction"
                      :show-press-button="!showTips"
                      @hold="handleHold"
                      @release="handleRelease"
                      @knowmore="handleKnowMore"></show-actions>
      </transition>
    </div>
    <world-area ref="worldarea"></world-area>
  </page>
</template>

<script>
import '@/assets/css/show.css'
import { initWX } from '@/assets/js/wx'
import Controller from '@/assets/js/controller'
import Page from '@/components/Page'
import ShowCover from '@/components/show/Cover'
import ShowEndCover from '@/components/show/EndCover'
import ShowEarth from '@/components/show/Earth'
import ShowClouds from '@/components/show/Clouds'
import VideoSprite from '@/components/show/VideoSprite'
import AudioSprite from '@/components/show/AudioSprite'
import ShowActions from '@/components/show/Actions'
import ThreeList from '@/views/WorldArea'
import { TREEJSON } from '@/assets/js/constants'
import { LIGHTMAP } from '@/assets/js/extern'

export default {
  controller: null,

  components: {
    'page': Page,
    'show-cover': ShowCover,
    'show-end-cover': ShowEndCover,
    'show-earth': ShowEarth,
    'show-clouds': ShowClouds,
    'show-video-sprite': VideoSprite,
    'show-audio-sprite': AudioSprite,
    'show-actions': ShowActions,
    'world-area': ThreeList
  },

  data () {
    return {
      isEnd: false,
      showTips: true,
      showAction: true,
      showCoord: false,
      coordIndex: -1,
      revealed: false,
      step: 0
    }
  },

  mounted () {
    this.$refs.worldarea.importJson(TREEJSON)
    this.addDocumentTouchMove()
    this.createController()
    setTimeout(initWX, 300)
  },

  methods: {
    addDocumentTouchMove () {
      document.documentElement.addEventListener('touchmove', this.handleDocumentTouchMove.bind(this))
    },
    // 按开始
    handleHold () {
      // this.$options.controller.start()
    },
    // 放开始
    handleRelease () {
      this.step = (this.step + 1) % 3 // 设置当前界面状态
      switch (this.step) {
        case 0:// idle状态
          // this.$options.controller.resetCountry(true)
          this.$options.controller.initCountry()
          break
        case 1:// zoom状态(国家)
          // this.$options.controller.switchCountry('China')
          this.$refs.worldarea.show()
          this.showAction = false
          let _this = this
          // 設置一級列表單機回調
          this.$refs.worldarea.addClickCallback(0, (c) => {
            this.$options.controller.switchCountry(c)
          })
          // 設置二級列表單擊回調
          this.$refs.worldarea.addClickCallback(1, (c, p) => {
            let ligthno = LIGHTMAP.hasOwnProperty(p) ? LIGHTMAP[p] : 0 // 获得對應國家或者省份的點亮人數
            this.$options.controller.switchProvince(c, p, ligthno)
            _this.$refs.worldarea.hide()
            setTimeout(() => {
              _this.showAction = true
            }, 5000)
          })
          break
        case 2:// zoom状态(省份,仅仅支持中国)
          this.$options.controller.hideTextBan()
          break
      }
      // this.$options.controller.end()
    },
    handleKnowMore () {
      this.isEnd = true
    },
    handleBack () {
      this.isEnd = false
    },
    handleDocumentTouchMove (e) {
      if (this.showTips) {
        this.showTips = false
      }
      e.preventDefault()
    },
    handleAudioSpriteEnd () {
      this.$options.controller.nextTarget()
    },
    createController () {
      let that = this
      let earth = this.$refs.earth.$options.earth
      let cloudSprite = this.$refs.cloudSprite.$options.imageSprite
      let videoSprite = this.$refs.videoSprite.$options.videoSprite
      let audioSprite = this.$refs.audioSprite.$options.audioSprite
      let controller = new Controller({
        earth: earth,
        cloud: cloudSprite,
        videoSprite,
        audioSprite,
        onTargetChange () {
          that.showCoord = false
        },
        onStateChange (stateName) {
          if (stateName === 'zooming') {
            that.showCoord = true
            // that.coordIndex = controller.target.coordSpriteIndex
          }
          if (stateName === 'presenting') {
            that.revealed = true
          }
        }
      })
      // setTimeout(_ => controller.nextTarget(), 1000)
      this.$options.controller = controller
    }
  }
}
</script>
