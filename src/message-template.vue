<template>
  <m-dialog
    :show.sync="show"
    :title="title"
    :width="width"
    :append-to-body="true"
    :show-close="showClose"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape='closeOnPressEscape'
    :is-middle="isMiddle"
    @close="handleClose"
    ref="dialog"
    class="m-message-box"
    >{{message}}
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
    }
  },
  methods: {
    handleClose (type) {
      this.callback && this.callback(type)
      this.$emit('close', type)
      setTimeout(() => {
        this.$refs['dialog'].$destroy()
      }, 3000)
    },
    handleConfrim () {
      this.show = false
    },
    handleCancel () {
      this.show = false
    }
  }
}
</script>
<style>
  .m-message-box .m-dialog__footer{
    padding-top: 0;
    text-align: right;
  }
</style>
