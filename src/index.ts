import { App, Plugin } from 'vue'
export { default as Dialog } from './dialog'
export * from './message-box'
import Dialog from './dialog'
import { alert, confirm, setDefaultOptions, MessageBoxOptions } from './message-box'
import './style.less'

export interface DialogPluginOptions {
  dialogName?: string
  alertName?: string
  confirmName?: string
  messageBoxDefaultOptions?: MessageBoxOptions
}

export default {
  install (app: App, options: DialogPluginOptions = {}) {
    app.component(options.dialogName || Dialog.name, Dialog)
    app.config.globalProperties[options.alertName || '$alert'] = alert
    app.config.globalProperties[options.confirmName || '$confirm'] = confirm
    if (options.messageBoxDefaultOptions) {
      setDefaultOptions(options.messageBoxDefaultOptions)
    }
  }
} as Plugin
