<template>
  <m-dialog
    :show.sync="show"
    :title="title"
    :width="width"
    :append-to-body="true"
    @close="handleClose"
    ref="dialog"
    >{{message}}
    <div slot="footer">
      <m-button type="info" size="small">确定</m-button>
    </div>
    </m-dialog>
</template>
<script>
import MDialog from './dialog'

export default {
  components: {
    MDialog
  },
  data () {
    return {
      show: false,
      title: '提示',
      width: '300px',
      message: ''
    }
  },
  methods: {
    handleClose () {
      this.callback && this.callback()
      this.$emit('close')
      setTimeout(() => {
        this.$refs['dialog'].$destroy()
      }, 3000)
    }
  }
}
</script>
