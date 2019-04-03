<template>
  <m-dialog
    :show.sync="show"
    :title="title"
    :width="width"
    :append-to-body="true"
    :show-close="showClose"
    :close-on-click-modal="true"
    :close-on-press-escape='true'
    :before-close="handleBeforeClose"
    :is-middle="isMiddle"
    :fade-name="fadeName"
    @close="handleClose"
    ref="dialog"
    class="m-message-box"
    >
    <div class="m-message-box--content" :class="{'has-type-icon': !!iconType}">
      <icon v-if="iconType" :name="iconType" class="m-message-box-type-img" />
      <div v-if="supperHTMLString" v-html="message"></div>
      <div v-else>{{message}}</div>
    </div>
    <div slot="footer"
      :class="{'text-center': controlButtonCenter}"
      >
      <button :class="cancelButtonClassName" @click="handleCancel" v-if="hasCancelButton">{{cancelButtonText}}</button>
      <button :class="confirmButtonClassName" @click="handleConfrim">{{confromButtonText}}</button>
    </div>
  </m-dialog>
</template>
<script>
import MDialog from './dialog'
import Icon from './icon'

export default {
  components: {
    MDialog,
    Icon
  },
  data () {
    return {
      show: true,
      title: 'Message',
      width: '300px',
      message: '',
      showClose: true,
      isMiddle: true,
      closeOnClickModal: true,
      closeOnPressEscape: false,
      controlButtonCenter: false,
      confromButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      cancelButtonClassName: 'm-message-button--cancel',
      confirmButtonClassName: 'm-message-button--confirm',
      hasCancelButton: false,
      supperHTMLString: false,
      callback: null,
      iconType: '',
      fadeName: 'scale-fade'
    }
  },
  methods: {
    handleClose (type) {
      this.callback && this.callback(type)
      this.$emit('close', type, this.clickButton)
      setTimeout(() => {
        this.$refs['dialog'].$destroy()
      }, 3000)
    },
    handleConfrim () {
      this.show = false
      this.clickButton = 'confrim'
    },
    handleCancel () {
      this.show = false
      this.clickButton = 'cancel'
    },
    handleBeforeClose (type, done) {
      if (type === 'modal' && this.closeOnClickModal) {
        done(true)
      }
      if (type === 'esc' && this.closeOnPressEscape) {
        done(true)
      }
      if (type === 'button') {
        done(true)
      }
    },
    created () {
      this.clickButton = 'cancel'
    }
  }
}
</script>
