
## Dialog

Vue 的 Dialog 模态框组件，包含了alert和confirm对话框。

[Live Demo](https://mengdu.github.io/m-dialog/example/index.html)

打包工具： [vue-component-devtool](https://github.com/mengdu/vue-component-devtool)

> 参考代码：[el-dialog](http://element.eleme.io/#/zh-CN/component/dialog)

## use


```ls
npm install vue-m-dialog
```

```js
import MDialog from 'vue-m-dialog'

Vue.use(MDialog) // 将挂载 m-dialog组件和 Vue.prototype.$alert 和 Vue.prototype.$confirm
```

如果 `Vue.prototype.$alert` 和 `Vue.prototype.$confirm` 方法冲突，通过配置：

```js
Vue.use(MDialog, {
  dialogName: 'm-dialog',
  alertName: 'msg',
  confirmName: 'dialog'
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

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| show      | 是否显示 Dialog，支持 .sync 修饰符 | boolean | — | false |
| title     | Dialog 的标题，也可通过具名 slot （见下表）传入 | string    | — | — |
| width     | Dialog 的宽度 | string    | — | 50% |
| auto-width     | 自动宽度 | boolean    | true/false | false |
| top       | Dialog CSS 中的 margin-top 值 | string | — | 15vh |
| append-to-body     | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true   | boolean   | — | false |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | boolean    | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog | boolean    | — | true |
| show-close | 是否显示关闭按钮 | boolean    | — | true |
| before-close | 关闭前的回调，会暂停 Dialog 的关闭 | closeType, done；done 用于关闭 Dialog；closeType 值为： 'modal', 'esc', 'button' | — | — |
| no-head | 去掉标题部分 | boolean | true/false | false |
| is-middle | 是否居中 | boolean | true/false | false |
| margin-top | 距离顶部 | string | — | — |


### Slot

| name | 说明 |
|------|--------|
| - | Dialog 的内容 |
| title | Dialog 标题区的内容 |
| footer | Dialog 按钮操作区的内容 |

### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close  | Dialog 关闭后回调，返回关闭触发类型 | closeType 值为 'user', 'esc', 'button', 'modal'|
| open  | Dialog 打开的回调 | — |


### Alert 提示框

`alert` 是一个提示窗

**alert(msg[, options])** 提示一条信息，并发多次调用会列队

  + **msg** `string` 必须，消息内容
  + **options** `object` 可选，配置对象

### Confirm 对话框

**confrim(msg[, options])** 对话框，并发多次调用会列队；返回 `Promise` 对象；确认会resolve，取消会reject

  + **msg** `string` 必须，消息内容
  + **options** `object` 可选，配置对象



**options** 配置对象如下:

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| options.title | 显示标题 | string | — | '提示' |
| options.width | 提示框宽度 | string | — | '300px' |
| options.typeIcon | 提示图标 | string | 图片url,info,warning,danger,success | '' |
| options.showClose | 是否显示关闭按钮 | boolean | true/false | true |
| options.isMiddle | 是否居中 | boolean | true/false | true |
| options.closeOnClickModal | 点击遮罩层是否关闭 | boolean | true/false | true |
| options.closeOnPressEscape | 按下esc按钮是否关闭 | boolean | true/false | false |
| options.closeOnPressEscape | 按下esc按钮是否关闭 | boolean | true/false | false |
| options.controlButtonCenter | 控制按钮是否居中 | boolean | true/false | false |
| options.confromButtonText | 确认按钮文字 | string | —  | '确认' |
| options.confirmButtonType | 确认按钮类型 | string | info,success,danger,warning,primary  | 'info' |
| options.cancelButtonText | 取消按钮文字 | string |  —   | '取消' |
| options.supperHTMLString | 是否支持html | boolean | true/false  | false |
| options.callback | 关闭后回调 | function | —   | null |
