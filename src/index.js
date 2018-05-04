import MDialog from './dialog'

import './dialog.less'

MDialog.install = function (Vue) {
  Vue.component(MDialog.name, MDialog)
}

export default MDialog
