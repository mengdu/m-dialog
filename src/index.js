import MDialog from './dialog'
import Alert from './alert'

import './dialog.less'

MDialog.install = function (Vue, options = {}) {
  Vue.component(options.dialogName || MDialog.name, MDialog)
  Vue.prototype['$' + (options.alertName || 'alert')] = Alert
}

export default MDialog
