import Vue from 'vue'
import MessageBox from './message-template'

const Mask = Vue.extend(MessageBox)
const alerts = []
let doing = false
let defaultOptions = {}

function Alert (msg, options = {}) {
  alerts.push({ msg, options })
  eventLoop()
}

function alert (msg, options = {}) {
  return new Mask({
    el: document.createElement('div'),
    data: {
      message: msg,
      ...defaultOptions,
      ...options,
      hasCancelButton: false
    }
  })
}

Alert.config = function (options) {
  if (!options) return
  defaultOptions = { ...options }
}

function eventLoop () {
  if (doing || alerts.length === 0) return
  doing = true
  const item = alerts.shift()
  const userCallback = item.options.callback

  item.options.callback = function () {
    userCallback && userCallback()
    setTimeout(function () {
      doing = false
      eventLoop()
    }, 300)
  }

  return alert(item.msg, item.options)
}

Alert.alert = alert

export default Alert
