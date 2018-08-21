import Vue from 'vue'
import PopupTemplate from './popup-template'
const instances = []
let count = 1
let Popup = null
const zIndexStack = []

const Mask = Vue.extend(PopupTemplate)

export default {
  watch: {
    show (val) {
      if (val) {
        this.mountTo()
        this.$emit('open')
        Popup.show = true
      } else {
        this.$emit('close', this.closeType)
        this.close(true)
      }
      // 处理堆叠问题
      this.setStack()
    }
  },
  methods: {
    mountTo () {
      if (Popup && this.appendToBody) {
        Popup.$el.appendChild(this.$el)
      }
    },
    afterClose () {
      for (let i in instances) {
        if (instances[i].show) {
          return false
        }
      }
      Popup.show = false
    },
    setStack () {
      if (this.show) {
        this.isCurrent = true
        zIndexStack.push(this)
        if (zIndexStack.length > 1) {
          zIndexStack[zIndexStack.length - 2].isCurrent = false
        }
      } else {
        const instance = zIndexStack.pop()
        if (instance) {
          instance.isCurrent = false
        }
        if (zIndexStack.length > 0) {
          zIndexStack[zIndexStack.length - 1].isCurrent = true
        }
      }
    }
  },
  created () {
    if (!Popup) {
      Popup = new Mask({
        el: document.createElement('div')
      })
      Popup.escKeyDown = function () {
        const current = zIndexStack[zIndexStack.length - 1]
        if (current) {
          current.closeType = 'esc'
          if (current.closeOnPressEscape) {
            if (typeof current.beforeClose === 'function') {
              current.beforeClose(current.closeType, current.close)
            } else {
              current.close(false)
            }
          }
        }
      }
      window.popup = Popup
      document.body.appendChild(Popup.$el)
    }

    this.id = ++count
    instances.push(this)

    if (this.show) {
      Popup.show = true
    }
  },
  mounted () {
    this.mountTo()
    this.setStack()
  },
  destroyed () {
    for (let i in instances) {
      if (this.id === instances[i].id) {
        instances.splice(i, 1)
        return false
      }
    }
    if (instances.length === 0) {
      Popup && Popup.$destroy()
    }
  }
}
