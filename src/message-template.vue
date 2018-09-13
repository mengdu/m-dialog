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
    @close="handleClose"
    ref="dialog"
    class="m-message-box"
    >
    <div class="m-message-box--content" :class="{'has-type-icon': !!msgIcon}">
      <img v-if="msgIcon" :src="msgIcon" alt="info" class="m-message-box-type-img" />

      <div v-if="supperHTMLString" v-html="message"></div>
      <div v-else>{{message}}</div>
    </div>
    <div slot="footer"
      :class="{'text-center': controlButtonCenter}"
      >
      <mb-button plain size="small" @click="handleCancel" v-if="hasCancelButton">{{cancelButtonText}}</mb-button>
      <mb-button :type="confirmButtonType" size="small" @click="handleConfrim">{{confromButtonText}}</mb-button>
    </div>
    </m-dialog>
</template>
<script>
import MDialog from './dialog'
import MbButton from './button'
import infoImg from './assets/info.svg'
import warningImg from './assets/warning.svg'
import errorImg from './assets/error.svg'
import successImg from './assets/success.svg'
const icons = {
  info: infoImg,
  warning: warningImg,
  danger: errorImg,
  success: successImg
}

export default {
  components: {
    MDialog,
    MbButton
  },
  data () {
    return {
      show: false,
      title: '提示',
      width: '300px',
      message: '',
      showClose: true,
      isMiddle: true,
      closeOnClickModal: true,
      closeOnPressEscape: false,
      controlButtonCenter: false,
      confromButtonText: '确认',
      confirmButtonType: 'info',
      cancelButtonText: '取消',
      hasCancelButton: false,
      supperHTMLString: false,
      callback: null,
      typeIcon: ''
    }
  },
  computed: {
    msgIcon () {
      return icons[this.typeIcon] ? icons[this.typeIcon] : this.typeIcon
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
<style>
  .m-message-box .m-dialog__footer{
    padding-top: 0;
    text-align: right;
  }
  .m-message-box .m-message-box--content.has-type-icon {
    padding-left: 50px;
  }
  .m-message-box .m-message-box-type-img {
    width: 30px;
    height: 30px;
    margin-left: -45px;
    margin-top: -5px;
    float: left;
    vertical-align: middle;
  }
  .m-message-box .m-dialog__body p{
    margin: 0;
  }
</style>
