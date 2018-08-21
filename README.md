
## Dialog

Dialog 模态框组件

例子：[Example](https://mengdu.github.io/m-dialog/example/index.html)

打包工具： [vue-component-devtool](https://github.com/mengdu/vue-component-devtool)

> 参考代码：[el-dialog](http://element.eleme.io/#/zh-CN/component/dialog)

## use


```ls
npm install vue-m-dialog
```

```js
import MDialog from 'vue-m-dialog'
import 'vue-m-dialog/dist/css/default.css'

Vue.use(MDialog)
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
| top       | Dialog CSS 中的 margin-top 值 | string | — | 15vh |
| append-to-body     | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true   | boolean   | — | false |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | boolean    | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog | boolean    | — | true |
| show-close | 是否显示关闭按钮 | boolean    | — | true |
| before-close | 关闭前的回调，会暂停 Dialog 的关闭 | function(done)，done 用于关闭 Dialog | — | — |
| no-head | 去掉标题部分 | boolean | — | false |

### Slot

| name | 说明 |
|------|--------|
| — | Dialog 的内容 |
| title | Dialog 标题区的内容 |
| footer | Dialog 按钮操作区的内容 |

### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close  | Dialog 关闭后回调，返回关闭触发类型 | closeType 值为 'user', 'esc', 'button', 'modal'|
| open  | Dialog 打开的回调 | — |
