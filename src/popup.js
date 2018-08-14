import Vue from 'vue'

const instances = []
let count = 1
let Popup = null

const PopupTemplate = {
  data () {
    return {
      show: false
    }
  },
  render (h) {
    console.log(this)
    if (!this.show) {
      return null
    }
    const children = [h('div', {'class': 'm-dialog__wrapper'})]
    return h('transition', {name: 'dialog-fade'}, children)
  }
}

const Mask = Vue.extend(PopupTemplate)

export default {
  created () {
    // if (!Container) {
    //   Container = document.createElement('div')
    //   Container.className = 'm-popup-container'
    //   document.body.appendChild(Container)
    // }
    if (!Popup) {
      Popup = new Mask({
        el: document.createElement('div')
      })
      document.body.appendChild(Popup.$el)
      Popup.show = true
    }

    this.id = ++count
    instances.push(this)
  },
  mounted () {
    console.log(this.$el)
    document.body.onclick = function () {
      console.log(Popup)
      Popup.show = !Popup.show
    }
  }
}
