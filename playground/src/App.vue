<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { reactive, ref, h } from 'vue'
import * as messageBox from '../../src'
import { Dialog } from '../../src'

const state = reactive({
  appendTo: null,
  hideHeader: false,
  hasMask: true,
  hideCloseButton: false,
  isMiddle: false,
  canClickMaskClose: true,
  draggable: false,
  resetDrag: false,
  isPointerEventsNone: false,
  class: 'my-dialog',
  padding: '50px',
  top: '50px',
  width: '350px',
  zIndex: 1000,
  beforeClose: (cb: (ok: boolean) => void) => {
    console.log('Close confirmation')
    cb(true)
  }
})
const show = ref(true)
const show2 = ref(false)
const threeBoxRef = ref(null)

const onAlert = () => {
  messageBox.alert('Hello, world !').then(res => console.log(res))
}

const onConfirm = () => {
  messageBox.confirm('Hello, world !').then(res => console.log(res))
}

const onMsgBox = () => {
  messageBox.createMessageBox({
    title: 'Are you sure ?',
    // message: 'This is content. Continue ?',
    message: () => h('div', [h('p', ['Hello ', h('b', 'everyone'), '.']), h('p', ['This is content. Continue ?'])]),
    cancelButtonText: 'No, Think again',
    confirmButtonText: 'Okey !',
    hasMask: false,
    draggable: true,
    isPointerEventsNone: true
  }).then(res => console.log(res))
}

const onCloseAll = () => {
  messageBox.closeAll()
}

</script>

<template>
  <div class="demo-btn">
    <label>
      AppendTo:
      <select v-model="state.appendTo">
        <option value="body">Body</option>
        <option value="#two">#two</option>
        <option :value="threeBoxRef">ThreeBoxRef</option>
        <option :value="null">None</option>
      </select>
    </label>&nbsp;
    <label><input type="checkbox" v-model="state.isMiddle" />IsMiddle</label>&nbsp;
    <label><input type="checkbox" v-model="state.hideCloseButton" />HideCloseButton</label>&nbsp;
    <label><input type="checkbox" v-model="state.hasMask" />HasMask</label>&nbsp;
    <label><input type="checkbox" v-model="state.hideHeader" />HideHeader</label>&nbsp;
    <label><input type="checkbox" v-model="state.canClickMaskClose" />CanClickMaskClose</label><br />
    <label><input type="checkbox" v-model="state.draggable" />Draggable</label>&nbsp;
    <label><input type="checkbox" v-model="state.resetDrag" />ResetDrag</label>&nbsp;
    <label><input type="checkbox" v-model="state.isPointerEventsNone" />IsPointerEventsNone</label><br />
    <label>zIndex: <input type="number" v-model="state.zIndex" /></label>&nbsp;
    <label>width: <input type="text" v-model="state.width" /></label>&nbsp;<br />
    <label>padding: <input type="text" v-model="state.padding" /></label>&nbsp;
    <label>top: <input type="text" v-model="state.top" /></label><br /><br />
    <button @click="show = !show">Visible:{{show}}</button>&nbsp;
    <button @click="onAlert">Alert</button>&nbsp;
    <button @click="onConfirm">Confirm</button>&nbsp;
    <button @click="onMsgBox">createMessageBox</button>&nbsp;
    <button @click="onCloseAll">CloseAll</button>&nbsp;
  </div>
  <div class="demo-box">
    <h1>Container one, position: relative</h1>
    <Dialog
      v-model="show"
      v-bind="state"
      >
      <template v-slot:title>
        <h4>Header</h4>
      </template>
      <p>
        <label><input type="checkbox" v-model="state.isMiddle" />IsMiddle</label>&nbsp;
        <button @click="show2 = true">Show Other Dialog</button>
      </p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <template v-slot:footer>
        <button class="m-dialog--cancel-btn" @click="show = false">Cancel</button>
        <button class="m-dialog--confirm-btn" @click="show = false">Okey !</button>
      </template>
    </Dialog>

    <MDialog
      v-model="show2"
      width="600px"
      title="Dialog 2"
      >
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <p>This is body</p>
      <template v-slot:footer>
        <strong>footer</strong>
      </template>
    </MDialog>
  </div>
  <p></p>
  <div class="demo-box" id="two">
    <h1>Container two, position: relative</h1>
  </div>
  <div class="demo-box" id="three" ref="threeBoxRef">
    <h1>Container two, position: relative</h1>
  </div>
</template>

<style lang="less">
body {
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
  font-size: 15px;
  color: #121212;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.demo-btn {
  margin: 0 auto;
  width: 760px;
  padding: 15px;
}

.demo-box {
  margin: 0 auto;
  width: 760px;
  height: 400px;
  border: solid 1px #1a8aec;
  position: relative;
  padding: 15px;
}
</style>
