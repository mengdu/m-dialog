<template>
  <div class="m-popup">
    <transition name="popup-fade">
    <div class="m-popup-wrapper" v-if="show"></div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    handleEscKey (event) {
      // ESC keydown
      if (event.keyCode === 27) {
        if (typeof this.escKeyDown === 'function') {
          this.escKeyDown()
        }
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.handleEscKey)
  },
  destroyed () {
    this.$el.parentNode.removeChild(this.$el)
    window.removeEventListener('keydown', this.handleEscKey)
  }
}
</script>
