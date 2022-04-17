import { defineComponent, ref, Teleport, Transition,
  watch, PropType, StyleValue, computed, RendererElement, onMounted, onBeforeUnmount, onUnmounted
} from 'vue'

declare module 'vue' {
  interface CSSProperties {
    '--dialog-top'?: string
    '--dialog-padding'?: string
  }
}

function useDrag(opt: {
  container: () => null | HTMLElement;
  target: () => null | HTMLElement;
  draggable: () => boolean
}) {
  const pos = ref({
    x: 0,
    y: 0
  })

  const onElMousedown = (e: MouseEvent) => {
    if (!opt.draggable()) return
    e.preventDefault()
    e.stopPropagation()

    const container = opt.container()
    const modal = opt.target()
    const startX = e.clientX
    const startY = e.clientY
    const ox = pos.value.x
    const oy = pos.value.y
    const boxRect = container ? container.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    }
    const modalRect = modal?.getBoundingClientRect()

    const onMouseMove = (e: MouseEvent) => {
      let offsetX = e.clientX - startX
      let offsetY = e.clientY - startY

      if (modalRect) {
        const minX = modalRect.left - boxRect.left
        const minY = modalRect.top - boxRect.top
        const maxX = boxRect.width - (modalRect.left - boxRect.left + modalRect.width)
        const maxY = boxRect.height - (modalRect.top - boxRect.top + modalRect.height)

        if (offsetX < 0 && offsetX <= -minX) {
          offsetX = -minX
        }
        if (offsetY < 0 && offsetY <= -minY) {
          offsetY = -minY
        }
        if (offsetX > 0 && offsetX >= maxX) {
          offsetX = maxX
        }
        if (offsetY > 0 && offsetY >= maxY) {
          offsetY = maxY
        }
      }
      pos.value.x = ox + offsetX
      pos.value.y = oy + offsetY
    }

    const onMouseUp = (e: MouseEvent) => {
      document.removeEventListener('mousemove', onMouseMove, false)
      document.removeEventListener('mouseup', onMouseUp, false)
    }
    
    document.addEventListener('mousemove', onMouseMove, false)
    document.addEventListener('mouseup', onMouseUp, false)
  }

  const resetPos = () => {
    pos.value.x = 0
    pos.value.y = 0
  }

  return {
    pos: pos,
    onElMousedown,
    resetPos
  }
}

export default defineComponent({
  name: 'MDialog',
  emits: ['update:modelValue', 'open', 'close'],
  props: {
    modelValue: Boolean,
    appendTo: {
      type: [String, Object, null, undefined] as PropType<string | RendererElement | null | undefined>,
      default: 'body'
    },
    title: String,
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
    hideCloseButton: Boolean,
    canClickMaskClose: Boolean,
    draggable: Boolean,
    resetDrag: Boolean, // 再次展示时是否重置拖拽位置
    isPointerEventsNone: Boolean, // 包裹部分是否支持指针穿透
    beforeClose: Function as PropType<(cb: (ok: boolean) => void) => void>
  },
  setup (props, { slots, emit, expose }) {
    const container = ref(null)
    const modal = ref(null)
    const visible = ref(props.modelValue)
    const { pos, onElMousedown, resetPos } = useDrag({
      container: () => container.value,
      target: () => modal.value,
      draggable: () => props.draggable
    })

    const dragStyle = computed(() => {
      if (pos.value.x === 0 && pos.value.y === 0) return {}
      if (!props.draggable) return {}
      return {
        left: pos.value.x + 'px',
        top: pos.value.y + 'px'
      }
    })

    const style = computed<StyleValue>(() => {
      const o:StyleValue = {
        zIndex: props.zIndex as number
      }
      if (props.padding) {
        o['--dialog-padding'] = props.padding
      }
      if (props.top) {
        o['--dialog-top'] = props.top
      }
      return o
    })
    const onClickClose = () => {
      close()
    }
    const onMaskClick = () => {
      if (props.canClickMaskClose) {
        close()
      }
    }
    const close = () => {
      if (typeof props.beforeClose === 'function') {
        props.beforeClose(ok => {
          if (ok) visible.value = false
        })
      } else {
        visible.value = false
      }
    }
    const show = () => visible.value = true

    watch(visible, (v) => {
      if (v !== props.modelValue) {
        emit('update:modelValue', v)
      }

      if (v) {
        emit('open')
      } else {
        emit('close')
        props.resetDrag && resetPos()
      }
    })

    watch(() => props.modelValue, (v) => {
      visible.value = v
    })

    onMounted(() => {
      if (visible.value) {
        emit('open')
      }
    })

    expose({
      close,
      show
    })
    return () => {
      return (
        <Teleport to={props.appendTo} disabled={!props.appendTo}>
          <Transition name="m-dialog" appear>
            {visible.value ? (
              <div class={[
                'm-dialog-wrapper',
                props.appendTo === 'body' && 'append-to-body',
                props.isMiddle && 'is-middle',
                props.isPointerEventsNone && 'is-pointer-events-none',
                props.class,
                ]}
                ref={container}
                style={style.value}>
                {props.hasMask ? <div class="m-dialog-mask" onClick={onMaskClick}></div> : null}
                <div class={['m-dialog', props.draggable && 'is-draggable']}
                  ref={modal}
                  style={{
                    width: props.width,
                    ...dragStyle.value
                  }}>
                  {props.hideHeader ? null : (
                    <div class="m-dialog--header" onMousedown={onElMousedown}>
                      <div class="m-dialog--title">{slots.title ? slots.title() : props.title}</div>
                      {props.hideCloseButton ? null : (
                        <button onClick={onClickClose} class="m-dialog--close-btn">
                          <svg viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
                        </button>
                      )}
                    </div>
                  )}
                  <div class="m-dialog--body">
                    {slots.default ? slots.default() : null}
                  </div>
                  {slots.footer ? (
                    <div class="m-dialog--footer">{slots.footer()}</div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </Transition>
        </Teleport>
      )
    }
  }
})
