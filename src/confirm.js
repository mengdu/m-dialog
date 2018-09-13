import Vue from 'vue'
import MessageBox from './message-template'

const Mask = Vue.extend(MessageBox)
const confirms = []
let doing = false

function eventLoop () {
  if (doing || confirms.length === 0) return
  doing = true
  const item = confirms.shift()
  let instance = new Mask({
    el: document.createElement('div'),
    data: {
      message: item.msg,
      hasCancelButton: true,
      closeOnClickModal: false,
      ...item.options
    }
  })

  instance.show = true

  instance.$on('close', function (type, clickButton) {
    if (type === 'user') {
      if (clickButton === 'confrim') {
        item.resolve()
      } else {
        item.reject(new Error('cancel'))
      }
    } else {
      item.reject(new Error('cancel'))
    }

    setTimeout(() => {
      doing = false
      eventLoop()
    }, 300)
  })
}

export default function (msg, options = {}) {
  const confrim = new Promise((resolve, reject) => {
    confirms.push({msg, options, resolve, reject})
    eventLoop()
  })

  return confrim
}
