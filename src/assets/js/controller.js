import { LOCATIONS, PROVINCELOCATIONS } from '@/assets/js/constants'
import shuffle from 'lodash.shuffle'
import TWEEN from 'tween.js'
import $ from 'jquery'

/* BaseState class */
class BaseState {
  constructor (controller) {
    this.controller = controller
  }

  forward () {}

  backward () {}

  updateLocations () {}
}

/**
 * IdleState EnteringState
 *
 * Foward: rotate the earth for entering animation, then go to the next state, which is IdleState
 * Backward: no backward
 */
class EnteringState extends BaseState {
  constructor (controller) {
    super(controller)
    this.tween = new TWEEN.Tween({
      x: 3.55, y: 0, z: -328, ry: 0
    }).to({
      x: 0, y: 0, z: -28, ry: Math.PI * -2
    }, 1600).onUpdate(function () {
      controller.earth.setCamera(this.x, this.y, this.z)
      controller.earth.earthGroup.rotation.y = this.ry
    }).onComplete(function () {
      controller.changeState('idle')
    }).easing(TWEEN.Easing.Cubic.Out).start()
  }

  forward () {
    TWEEN.update()
  }
}

/**
 * IdleState class
 *
 * Foward: go the next state, which is RotatingState
 * Backward: no backward
 */
class IdleState extends BaseState {
  constructor (controller) {
    super(controller)
    // don't play audio sprite if EnteringState => IdleState
    // cause nextTarget() will play the audio
    if (!(controller.state instanceof EnteringState)) {
      controller.playSprite('audio')
    }

    controller.earth.controller.enabled = true
  }

  forward () {
    this.controller.changeState('rotating')
  }
}

/**
 * RotatingState class
 * 摩擦地球时触发
 * Forward: if reaches the cameraFarPosition, then move to the next state, which is ZoomingState; otherwise, keep set camera till reaches the target
 * Backward: back to IdleState util the rotation completed
 */
class RotatingState extends BaseState {
  constructor (controller) {
    super(controller)
    this.tween = null
    // controller.pauseSprite('audio')
    controller.earth.controller.enabled = false
  }

  forward () {
    let that = this
    let earth = this.controller.earth
    let target = this.controller.target
    if (this.tween) {
      TWEEN.update()
    } else {
      this.tween = new TWEEN.Tween(earth.cameraPosition()).to({
        x: target.cameraFarPosition[0],
        y: target.cameraFarPosition[1],
        z: target.cameraFarPosition[2]
      }, 1000).onUpdate(function () {
        earth.setCamera(this.x, this.y, this.z)
      }).onComplete(function () {
        that.controller.changeState('zooming')
        that.tween = null
      }).start()
    }
  }

  backward () {
    if (this.tween) {
      TWEEN.update()
    } else {
      this.controller.state = new IdleState(this.controller)
    }
  }
}

/**
 * ZoomingState class
 * 进入touch状态触发
 * Forward: from current camera position to the camera near position of the target, once reach the position, go to the next state, which is DivingState
 * Backward: from current camera position to the camera far position of the target, once reach the position, go to the IdleState
 */
class ZoomingState extends BaseState {
  constructor (controller) {
    super(controller)
    this.direction = ''
    this.tween = null
    controller.hideCloud()
    // controller.showEarth()
  }

  _setDirection (direction) {
    let that = this
    let earth = this.controller.earth
    let target = this.controller.target
    let from = earth.cameraPosition()
    let to = null

    if (this.direction !== direction) {
      if (direction === 'forward') {
        to = {
          x: target.cameraNearPosition[0],
          y: target.cameraNearPosition[1],
          z: target.cameraNearPosition[2]
        }
      } else {
        to = {
          x: target.cameraFarPosition[0],
          y: target.cameraFarPosition[1],
          z: target.cameraFarPosition[2]
        }
      }

      this.direction = direction
      this.tween && this.tween.stop()

      this.tween = new TWEEN.Tween(from).to(to, 1000).onUpdate(function () {
        earth.setCamera(this.x, this.y, this.z)
      }).onComplete(function () {
        that._handleTweenComplete()
      }).start()
    }
  }

  _handleTweenComplete () {
    if (this.direction === 'forward') {
      this.controller.changeState('diving')
    } else {
      this.controller.changeState('idle')
    }
    this.tween = null
  }

  forward () {
    this._setDirection('forward')
    if (this.tween) {
      TWEEN.update()
    }
  }

  backward () {
    this._setDirection('backward')
    if (this.tween) {
      TWEEN.update()
    }
  }
}

/**
 * DivingState class
 * 放大动画结束
 * Forward: from current frame index to the end of frame index, once reach the end, go to the next state, which is PresentingState
 * Backward: from current frame index to the beginning of the frame index, once reach the beginning, go to the previous state, which is DivingState
 */
class DivingState extends BaseState {
  constructor (controller) {
    super(controller)
    this.count = 0
    if (controller.needCloud) {
      controller.showCloud()
    }
    // controller.hideEarth()
    // controller.hideVideo()
  }

  _throttle (fn) {
    if (this.count % 3 === 0) {
      fn && fn()
      this.count = 0
    }
    this.count++
  }

  forward () {
    let cloud = this.controller.cloud
    if (cloud.currentFrameIndex === cloud.images.length - 1) {
      this.controller.changeState('presenting')
    } else {
      this._throttle(_ => cloud.next())
    }
  }

  backward () {
    let cloud = this.controller.cloud
    if (cloud.currentFrameIndex === 0) {
      this.controller.changeState('zooming')
    } else {
      this._throttle(_ => cloud.prev())
    }
  }
}

/**
 * PresentingState class
 *
 * Forward: no more forward actions
 * Backward: go to the previous state, which is DivingState
 */
class PresentingState extends BaseState {
  constructor (controller) {
    super(controller)
    controller.hideCloud()
    // controller.showVideo()
  }

  backward () {
    this.controller.changeState('diving')
  }
}

/* Controller class */
export default class Controller {
  constructor (options) {
    this.needCloud = true
    this.earth = options.earth
    this.cloud = options.cloud
    // this.audioSprite = options.audioSprite
    this.videoSprite = options.videoSprite
    this.onStateChange = options.onStateChange
    this.onTargetChange = options.onTargetChange

    this.state = null
    this.touchDown = false

    this.target = null
    this.targetList = []

    this._init()
  }

  _init () {
    setTimeout(_ => { this.state = new EnteringState(this) }, 800)
    this._shuffleTargetList()
    this._loop()
  }

  _shuffleTargetList () {
    var nArray = []
    for (let k in LOCATIONS) {
      nArray.push(k)
    }
    this.targetList = shuffle(nArray)
  }

  _loop () {
    requestAnimationFrame(this._loop.bind(this))
    this._animate()
  }

  _animate () {
    if (!this.state) {
      return
    }

    if (this.state instanceof EnteringState) {
      this.state.forward()
    }

    if (this.touchDown && this.target) {
      this.state.forward()
    } else {
      this.state.backward()
    }
  }

  showEarth (fn) {
    $(this.earth.container).fadeIn(500, fn)
    // this.earth.container.style.display = 'block'
  }

  hideEarth (fn) {
    $(this.earth.container).fadeOut(500, fn)
    // this.earth.container.style.display = 'none'
  }

  showCloud () {
    this.cloud.el.style.display = 'block'
  }

  hideCloud () {
    this.cloud.el.style.display = 'none'
  }

  showVideo () {
    // this.playSprite('video')
    // this.videoSprite.media.style.display = 'block'
  }

  hideVideo () {
    // this.pauseSprite('video')
    // this.videoSprite.media.style.display = 'none'
  }

  showText (text, no, fn) {
    // this.playSprite('video')
    // this.videoSprite.media.style.display = 'block'
    // this.showEarth(() => {
    this.videoSprite.showText(fn, text, no)
    // })
  }

  hideText () {
    // this.pauseSprite('video')
    // this.videoSprite.media.style.display = 'none'
    // this.hideEarth(() => {
    this.videoSprite.hideText()
    // })
  }

  playSprite (type) {
    if (!this.target) {
      return
    }

    /*
    if (type === 'video') {
      this.videoSprite.repeat(this.target.name)
    } else if (type === 'audio') {
      this.audioSprite.play(this.target.name)
    }
    */
  }

  pauseSprite (type) {
    /*
    if (type === 'video') {
      this.videoSprite.pause()
    } else if (type === 'audio') {
      this.audioSprite.pause()
    }
    */
  }

  start () {
    this.touchDown = true
  }

  end () {
    this.touchDown = false
  }

  switchCountry (country) {
    this.earth.stopAutoRotate()
    // this.earth.updateLocations(country)
    this.earth.updateProvinceLocations(country)
    this.setTarget(LOCATIONS[country])
    this.touchDown = true
  }
  // 空地球
  initCountry () {
    this.earth.emptyLocations()
  }
  // 包含國家地球
  resetCountry (reloadLocation, noCloud, noAutoRotate) {
    this.needCloud = !noCloud
    if (!noAutoRotate) {
      this.earth.startAutoRotate()
    }
    if (reloadLocation) {
      // this.earth.initLocations()
      this.initCountry()
    }
    this.touchDown = false
  }
  // 隐藏文字版
  hideTextBan () {
    this.earth.initLocations()
    this.hideText()
  }
  switchProvince (country, province, no) {
    this.resetCountry(false, false, true)
    // let _this = this
    setTimeout(() => {
      this.earth.stopAutoRotate()
      this.earth.updateLocations(country, province)
      this.setTarget((PROVINCELOCATIONS.hasOwnProperty(country)) ? PROVINCELOCATIONS[country][province] : LOCATIONS[country])
      this.touchDown = true
      // 2s后,显示文字后,直接恢复世界地图
      setTimeout(() => {
        this.earth.startAutoRotate()
        let text = province || country
        this.showText(text, no, () => {
          this.resetCountry(false, true)
        })
      }, 2000)
    }, 1000)
  }
  nextTarget () {
    // let nextTargetIndex = (this.targetList.indexOf(this.target ? this.target.name : null) + 1) % this.targetList.length
    // this.setTarget(this.targetList[nextTargetIndex])
    // console.log('asd')
  }

  // setTarget (locationName) {
    // this.target = LOCATIONS[locationName]
  setTarget (locationObject) {
    this.target = locationObject
    this.onTargetChange && this.onTargetChange()
    /*
    this.playSprite('audio')
    */
    this.videoSprite.randomPicture(locationObject)
  }

  changeState (stateName) {
    switch (stateName) {
      case 'idle':
        this.state = new IdleState(this)
        break
      case 'rotating':
        this.state = new RotatingState(this)
        break
      case 'zooming':
        this.state = new ZoomingState(this)
        break
      case 'diving':
        this.state = new DivingState(this)
        break
      case 'presenting':
        this.state = new PresentingState(this)
        break
      default:
        this.state = new BaseState(this)
    }
    this.onStateChange && this.onStateChange(stateName)
  }
}
