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
    <!-- <img :src="infoImg" alt="info" class="m-message-box-type-img" /> -->
    <p>{{message}}</p>
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
// import infoImg from './assets/info.svg'

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
      type: 'info',
      showClose: true,
      isMiddle: true,
      closeOnClickModal: true,
      closeOnPressEscape: false,
      controlButtonCenter: false,
      confromButtonText: '确定',
      confirmButtonType: 'info',
      cancelButtonText: '取消',
      hasCancelButton: false,
      supperHTMLString: false,
      callback: null
      // infoImg
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
  .m-message-box .m-message-box-type-img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .m-message-box .m-dialog__body p{
    margin: 0;
  }
</style>
