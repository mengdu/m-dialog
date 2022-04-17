
import { AppContext, h, render, ref, PropType, defineComponent, reactive, ComponentInternalInstance } from 'vue'
import Dialog from './dialog'

const intances: ComponentInternalInstance[] = []

const MessageBoxComponent = defineComponent({
  components: { Dialog },
  props: {
    title: String,
    message: [String, Object, Function] as PropType<string | JSX.Element | (() => JSX.Element)>,
    showCancelButton: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    cancelButtonText: {
      type: [String, Object, Function] as PropType<string | JSX.Element>,
      default: () => 'Cancel'
    },
    confirmButtonText: {
      type: [String, Object, Function] as PropType<string | JSX.Element>,
      default: () => 'Ok'
    },
    disableCancelButton: Boolean,
    disableConfirmButton: Boolean,
    class: String,
    width: String,
    zIndex: [String, Number],
    padding: String,
    top: String,
    isMiddle: Boolean,
    hideHeader: Boolean,
    hasMask: {
      type: Boolean,
      default: true
    },
    draggable: Boolean,
    isPointerEventsNone: Boolean,
    beforeClose: Function as PropType<(cb: (ok: boolean) => void) => void>,
    onOpen: Function as PropType<(...args: any[]) => any>,
    onRemove: Function as PropType<(...args: any[]) => any>,
    onAction: Function as PropType<(action: string) => void>,
  },
  setup (props, { expose }) {
    const visible = ref(true)

    const onAction = (action: string, skipBeforeClose = false) => {
      visible.value = false
      if (!props.onAction) return
      if (skipBeforeClose) props.onAction && props.onAction(action)

      if (props.beforeClose) {
        props.beforeClose(ok => {
          if (ok) props.onAction && props.onAction(action)
        })
      } else {
        props.onAction && props.onAction(action)
      }
    }
  
    const onClose = () => {
      if (visible.value) {
        props.onAction && props.onAction('close')
      }

      if (props.onRemove) {
        props.onRemove()
      }
    }

    const beforeClose = (cb: (ok: boolean) => void) => {
      if (props.beforeClose) {
        props.beforeClose(cb)
      } else {
        cb(true)
      }
    }

    const doClose = () => {
      // 外部主动关闭跳过关闭检查
      onAction('outside', true)
    }

    expose({
      doClose
    })

    return () => (
      <Dialog
        modelValue={visible.value}
        title={props.title}
        class={['m-message-box', props.class].filter(e => e).join(' ')}
        width={props.width}
        zIndex={props.zIndex}
        padding={props.padding}
        top={props.top}
        isMiddle={props.isMiddle}
        hideHeader={props.hideHeader}
        hasMask={props.hasMask}
        canClickMaskClose={false}
        draggable={props.draggable}
        isPointerEventsNone={props.isPointerEventsNone}
        beforeClose={beforeClose}
        onOpen={props.onOpen}
        onClose={onClose}
        >
          {{
            default: () => typeof props.message === 'function' ? props.message() : props.message,
            footer: () => (
              <>
                {props.showCancelButton ? (
                  <button class={['m-dialog--cancel-btn']}
                    disabled={props.disableCancelButton}
                    onClick={() => onAction('cancel')}>{props.cancelButtonText}</button>
                ) : null}
                {props.showConfirmButton ? (
                  <button class={['m-dialog--confirm-btn']}
                    disabled={props.disableConfirmButton}
                    onClick={() => onAction('confirm')}>{props.confirmButtonText}</button>
                ) : null}
              </>
            )
          }}
      </Dialog>
    )
  }
})

const getContainer = () => document.createElement('div')

function genIntance(props: any, el: HTMLElement, ctx: AppContext | null | undefined) {
  const vnode = h(MessageBoxComponent, props)
  if (ctx) {
    vnode.appContext = ctx
  }
  render(vnode, el)
  document.body.appendChild(el)
  return vnode.component
}

export interface MessageBoxOptions {
  title?: string
  message?: string | JSX.Element | (() => JSX.Element)
  class?: string
  width?: string
  padding?: string
  top?: string
  zIndex?: string|number
  isMiddle?: boolean
  hideHeader?: boolean
  hasMask?: boolean
  draggable?: boolean
  isPointerEventsNone?: boolean
  showCancelButton?: boolean
  showConfirmButton?: boolean
  disableCancelButton?: boolean
  disableConfirmButton?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  beforeClose?: (cb: (ok: boolean) => void) => void
  onOpen?: () => void
  onRemove?: () => void
  [key: string]: any
}

const defaultOptions: MessageBoxOptions = {}

export function createMessageBox (options: MessageBoxOptions, context?: AppContext) :Promise<{ action: string, ok: boolean }> {
  return new Promise((resolve, reject) => {
    const el = getContainer()
    const props = reactive({
      ...options,
      onAction: (action: string) => {
        resolve({ action, ok: action === 'confirm' })
      },
      onClose: () => {
        for (let i = 0; i < intances.length; i++) {
          if (intances[i] === intance) {
            intances.splice(i, 1)
            break
          }
        }
        // 延迟保证退出动画完整
        setTimeout(() => {
          render(null, el)
          el.remove()
        }, 2000)
      }
    })
    const intance = genIntance(props, el, context)
    if (intance) {
      intances.push(intance)
    }
  })
}

export const alert = (message: string, title?: string, options?: MessageBoxOptions, context?: AppContext) => createMessageBox({
  title: title || 'Alert',
  message: message,
  showCancelButton: false,
  ...defaultOptions,
  ...options
}, context)

export const confirm = (message: string, title?: string, options?: MessageBoxOptions, context?: AppContext) => createMessageBox({
  title: title || 'Confirm',
  message: message,
  ...defaultOptions,
  ...options
}, context)

export const closeAll = () => {
  intances.forEach(e => {
    e.exposed?.doClose()
  })
}

export const setDefaultOptions = (opts?: MessageBoxOptions) => {
  if (!opts) return
  for (const k in opts) {
    if (opts[k] !== undefined) {
      defaultOptions[k] = opts[k]
    }
  }
}
