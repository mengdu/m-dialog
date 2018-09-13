import Vue from 'vue'
import MessageBox from './message-template'

const Mask = Vue.extend(MessageBox)
const alerts = []
let doing = false

function eventLoop () {
  if (doing || alerts.length === 0) return
  doing = true
  const item = alerts.shift()
  const userCallback = item.options.callback
  let instance = new Mask({
    el: document.createElement('div'),
    data: {
      message: item.msg,
      ...item.options,
      hasCancelButton: false,
      callback () {
        userCallback && userCallback()
        setTimeout(() => {
          doing = false
          eventLoop()
        }, 300)
      }
    }
  })
  instance.show = true
}

export default function (msg, options = {}) {
  alerts.push({msg, options})
  eventLoop()
}
