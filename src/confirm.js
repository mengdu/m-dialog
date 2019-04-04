import Vue from 'vue'
import MessageBox from './message-template'

const Mask = Vue.extend(MessageBox)
const confirms = []
let doing = false
let defaultOptions = {}

function Confirm (msg, options = {}) {
  const confrim = new Promise((resolve, reject) => {
    confirms.push({ msg, options, resolve, reject })
    eventLoop()
  })

  return confrim
}

function confirm (msg, options = {}) {
  return new Promise(function (resolve, reject) {
    const instance = new Mask({
      el: document.createElement('div'),
      data: {
        message: msg,
        hasCancelButton: true,
        closeOnClickModal: false,
        ...defaultOptions,
        ...options
      }
    })

    instance.$on('close', function (type, clickButton) {
      if (type === 'user') {
        if (clickButton === 'confrim') {
          resolve()
        } else {
          reject(new Error('Cancel'))
        }
      } else {
        reject(new Error('Cancel'))
      }
    })
  })
}

Confirm.config = function (options) {
  if (!options) return
  defaultOptions = { ...options }
}

function eventLoop () {
  if (doing || confirms.length === 0) return
  doing = true
  const item = confirms.shift()

  confirm(item.msg, item.options).then(function () {
    item.resolve()
    setTimeout(() => {
      doing = false
      eventLoop()
    }, 300)
  }).catch(function (err) {
    item.reject(new Error(err.message))
    setTimeout(() => {
      doing = false
      eventLoop()
    }, 300)
  })
}

Confirm.confirm = confirm

export default Confirm
