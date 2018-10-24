<template>

  <div class="c-actions" >
    <span :class="{'c-actions__longPressText': true, 'is-active': showPressButton}"></span>
    <span :class="{'c-actions__longPress': true, 'is-active': showPressButton}" @touchstart.prevent="handleStart" @touchend="handleEnd" @touchcancel="handleEnd"></span>
  </div>

</template>

<script>
  import '@/assets/css/show.css'
export default {
    props: {
      showPressButton: Boolean
    },
    methods: {
      handleStart () {
        this.$emit('hold')
      },

      handleEnd () {
        this.$emit('release')
      },
      handleClickXPlan () {
        this.$emit('knowmore')
      }
    }
}
</script>
