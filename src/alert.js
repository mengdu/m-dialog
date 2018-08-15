import Vue from 'vue'
import MessageBox from './message-template'

const Mask = Vue.extend(MessageBox)

export default function (msg, options = {}) {
  let instance = new Mask({
    el: document.createElement('div'),
    data: {message: msg, ...options}
  })

  instance.show = true
  return instance
}
