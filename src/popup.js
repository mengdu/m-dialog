import Vue from 'vue'
import PopupTemplate from './popup-template'
const instances = []
let count = 1
let Popup = null

// const PopupTemplate = {
//   data () {
//     return {
//       show: false
//     }
//   },
//   render (h) {
//     console.log(this)
//     if (!this.show) {
//       return null
//     }
//     const children = [h('div', {'class': 'm-dialog__wrapper'})]
//     return h('transition', {name: 'dialog-fade'}, children)
//   }
// }

const Mask = Vue.extend(PopupTemplate)

export default {
  created () {
    if (!Popup) {
      Popup = new Mask({
        el: document.createElement('div')
      })
      document.body.appendChild(Popup.$el)
    }

    this.id = ++count
    instances.push(this)

    if (this.show) {
      Popup.show = true
    }
  },
  mounted () {
    if (Popup && this.appendToBody) {
      Popup.$el.appendChild(this.$el)
    }
    document.body.onclick = function () {
      console.log(instances)
      Popup.show = !Popup.show
    }
  }
}
