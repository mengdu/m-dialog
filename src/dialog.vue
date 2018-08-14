<template>
  <transition name="dialog-fade">
  <div class="m-dialog__wrapper" v-if="show" @click.stop="handleClose('modal')">
    <div class="m-dialog" @click.stop="" :style="style">
      <div class="m-dialog__header" v-if="!noHead">
        <span class="m-dialog__title"><slot name="title">{{title}}</slot></span>
        <button class="m-dialog__close" @click.stop="handleClose('button')" v-if="showClose"><span>×</span></button>
      </div>
      <div class="m-dialog__body"><slot></slot></div>
      <div class="m-dialog__footer" v-if="$slots.footer"><slot name="footer"></slot></div>
    </div>
  </div>
  </transition>
</template>
<script>
import popup from './popup'
import props from './props'
export default {
  name: 'MDialog',
  mixins: [popup],
  props,
  computed: {
    style () {
      let css = {}
      if (this.width) {
        css.width = this.width
      }
      if (this.top) {
        css.top = this.top
      }
      return css
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.mountModal()
      }
      this.setBodyOverflow()
    }
  },
  methods: {
    handleClose (type) {
      if (type === 'modal' && !this.closeOnClickModal) return false
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:show', false)
        this.$emit('close')
      }
    },
    mountModal () {
      if (this.show) {
        this.$emit('open')
      }
      if (this.appendToBody && this.show) {
        document.body.appendChild(this.$el)
      }
    },
    setBodyOverflow () {
      if (this.show) {
        this.oldRight = document.body.style.marginRight || ''
        document.body.style.overflow = 'hidden'
        document.body.style.marginRight = '17px'
      } else {
        setTimeout(() => {
          document.body.style.overflow = ''
          document.body.style.marginRight = this.oldRight
        }, 300)
      }
    },
    handleEscKey (event) {
      // ESC keydown
      if (event.keyCode === 27) {
        this.closeOnPressEscape && this.hide(true)
      }
    }
  },
  mounted () {
    // this.mountModal()
    this.setBodyOverflow()
    window.addEventListener('keydown', this.handleEscKey)
  },
  destroyed () {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    window.removeEventListener('keydown', this.handleEscKey)
  }
}
</script>
