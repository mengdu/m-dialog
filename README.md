
## Dialog

Vue 的 `Dialog` 弹窗组件，包含了 `alert` 和 `confirm` 对话框。

[Live Demo](https://mengdu.github.io/m-dialog/index.html)

> 参考代码：[el-dialog](http://element.eleme.io/#/zh-CN/component/dialog)

## Use

```ls
npm install vue-m-dialog
```

```js
import MDialog from 'vue-m-dialog' // ro import { Dialog, Alert, Confirm } from 'vue-m-dialog'
import 'vue-m-dialog/dist/index.css'

Vue.use(MDialog) // 将挂载 m-dialog组件和 Vue.prototype.$alert 和 Vue.prototype.$confirm
```

如果 `Vue.prototype.$alert` 和 `Vue.prototype.$confirm` 方法冲突，通过配置：

```js
Vue.use(MDialog, {
  dialogName: 'm-dialog',
  alertName: 'msg',
  confirmName: 'dialog',
  alertOptions: {}, // alert全部默认配置
  confirmOptions: {} // confirm 全局默认配置
})
```

```html
<m-dialog
  :show.sync="show"
  title="提示"
  :append-to-body="appendToBody"
  :close-on-click-modal="closeOnClickModal"
  :close-on-press-escape="closeOnPressEscape"
  :no-head="noHead"
  :before-close="close"
  @open="onOpen"
  @close="onClose"
  width="300px"
  >
  <span>这里是正文内容...</span>
  <div slot="footer">
    <div style="float: right">
      <m-button plain @click="show = false">取消</m-button>
      <m-button type="info">确定</m-button>
    </div>
  </div>
</m-dialog>
```


### MDialog Attributes

| 参数                  | 说明                                            | 类型     | 可选值                     | 默认值       |
|-----------------------|-------------------------------------------------|----------|----------------------------|--------------|
| show                  | 是否显示 Dialog，支持 .sync 修饰符              | boolean  | —                          | false        |
| title                 | Dialog 的标题，也可通过具名 slot （见下表）传入 | string   | —                          | —            |
| width                 | Dialog 的宽度                                   | string   | —                          | 50%          |
| auto-width            | 自动宽度                                        | boolean  | true/false                 | false        |
| top                   | Dialog CSS 中的 margin-top 值                   | string   | —                          | 15vh         |
| append-to-body        | 弹窗DOM是否插入到 body                          | boolean  | —                          | false        |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Dialog              | boolean  | true/false                 | true         |
| close-on-press-escape | 是否可以通过按下 `ESC` 键关闭 Dialog            | boolean  | true/false                 | true         |
| show-close            | 是否显示关闭按钮                                | boolean  | true/false                 | true         |
| before-close          | 关闭前的回调，会暂停 Dialog 的关闭              | function | —                          | —            |
| no-head               | 去掉标题部分                                    | boolean  | true/false                 | false        |
| is-middle             | 是否居中                                        | boolean  | true/false                 | false        |
| margin-top            | 距离顶部                                        | string   | —                          | —            |
| fade-name             | 弹窗动画过渡类名                                | string   | 'scale-fade', 'slide-fade' | 'slide-fade' |


### Slot

| name   | 说明                    |
|--------|-------------------------|
| -      | Dialog 的内容           |
| title  | Dialog 标题区的内容     |
| footer | Dialog 按钮操作区的内容 |

### Events

| 事件名称 | 说明                                | 回调参数                                        |
|----------|-------------------------------------|-------------------------------------------------|
| close    | Dialog 关闭后回调，返回关闭触发类型 | closeType 值为 'user', 'esc', 'button', 'modal' |
| open     | Dialog 打开的回调                   | —                                               |



## Alert 提示框

`Alert` 是一个提示窗

```js
import { Alert } from 'vue-m-dialog'

Alert('Hello !')
// ro
Alert.alert('Hello !')
```

**Alert(msg[, options])** 提示一条信息，这是个列队模式，同时执行多次会逐个弹窗，如果需要多个弹出，请使用 `Alert.alert`

  + **msg** `string` 必须，消息内容
  + **options** `object` 可选，配置对象


**Alert.alert(msg[, options])** 不列队弹窗， 返回当前组件对象

  + **msg** `string` 必须，消息内容
  + **options** `object` 可选，配置对象


**Alert.config(options)** 设置全局的默认配置


## Confirm 对话框

```js
import { Confirm } from 'vue-m-dialog'

Confirm('Are you sure ?')
// ro
Confirm.confirm('Are you sure ?')
```

**Confirm(msg[, options])** 对话框，并发多次调用会列队；返回 `Promise` 对象；确认会 `resolve`，取消会 `reject`；如果不需要列队请用 `Confirm.confirm`

  + **msg** `string` 必须，消息内容
  + **options** `object` 可选，配置对象

**Confirm.confirm(msg[, options])** 对话框不列队处理

  + **msg** `string` 必须，消息内容
  + **options** `object` 可选，配置对象

**Confirm.config(options)** 设置全局默认配置



**options** 配置对象如下:

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| options.title | 显示标题 | string | — | 'Message' |
| options.width | 提示框宽度 | string | — | '300px' |
| options.iconType | 提示图标 | string | `info`, `warning`, `danger`, `success`, 'question | '' |
| options.iconImg | 提示图标url | string | — | '' |
| options.showClose | 是否显示关闭按钮 | boolean | true/false | true |
| options.isMiddle | 是否居中 | boolean | true/false | true |
| options.closeOnClickModal | 点击遮罩层是否关闭 | boolean | true/false | true |
| options.closeOnPressEscape | 按下esc按钮是否关闭 | boolean | true/false | false |
| options.controlButtonCenter | 控制按钮是否居中 | boolean | true/false | false |
| options.confirmButtonText | 确认按钮文字 | string | —  | 'Confirm' |
| options.cancelButtonText | 取消按钮文字 | string |  —   | 'Cancel' |
| options.cancelButtonClassName | 取消按钮类名 | string |  —   | 'm-message-button--cancel' |
| options.confirmButtonClassName | 确认按钮类名 | string |  —   | 'm-message-button--confirm' |
| options.supperHTMLString | 是否支持html | boolean | true/false  | false |
| options.callback | 关闭后回调 | function | —   | null |
| options.fadeName | 弹窗动画过渡类名 | 'scale-fade', 'slide-fade' | 'slide-fade' |
