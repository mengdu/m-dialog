<template>
  <transition name="dialog-fade">
  <div class="m-dialog__wrapper"
    :class="{
      'm-dialog__top': isCurrent,
      'm-dialog__bottom': !isCurrent,
      'm-dialog__auto': autoWidth,
      'm-dialog__middle': isMiddle
    }"
    v-if="show" @click.stop="handleClose('modal')">
    <div class="m-dialog" @click.stop :style="style">
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
  data () {
    return {
      isCurrent: false,
      closeType: 'user'
    }
  },
  computed: {
    style () {
      let css = {}
      if (this.width) {
        css.width = this.width
      }
      if (this.top) {
        css.top = this.top
      }
      if (this.marginTop) {
        css.marginTop = this.marginTop
      }
      return css
    }
  },
  methods: {
    handleClose (type) {
      if (type === 'modal' && !this.closeOnClickModal) return false
      this.closeType = type
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.close)
      } else {
        this.close(false)
      }
    },
    close (isClose) {
      if (this.show) {
        this.$emit('update:show', false)
      }
      isClose && this.afterClose()
    }
  },
  destroyed () {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
