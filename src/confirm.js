import Vue from 'vue'
import MessageBox from './message-template'

const Mask = Vue.extend(MessageBox)

export default function (msg, options = {}) {
  return new Promise((resolve, reject) => {
    let instance = new Mask({
      el: document.createElement('div'),
      data: {message: msg, hasCancelButton: true, ...options}
    })

    instance.show = true

    instance.$on('close', function (type) {
      console.log(type)
      resolve()
    })
  })
}
