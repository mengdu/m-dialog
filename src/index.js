import MDialog from './dialog'
import Alert from './alert'
import Confirm from './confirm'

import './dialog.less'

MDialog.install = function (Vue, options = {}) {
  Vue.component(options.dialogName || MDialog.name, MDialog)
  Vue.prototype['$' + (options.alertName || 'alert')] = Alert
  Vue.prototype['$' + (options.confirmName || 'confirm')] = Confirm
}

export {
  MDialog as default,
  MDialog,
  Alert,
  Confirm
}
