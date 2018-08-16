export default {
  width: String,
  autoWidth: Boolean,
  top: String,
  show: Boolean,
  title: String,
  noHead: Boolean,
  appendToBody: Boolean,
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  beforeClose: Function,
  isMiddle: Boolean,
  marginTop: String
}
