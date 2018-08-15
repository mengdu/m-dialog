<template>
  <div id="app">
    <fork-link :repo="repo" />
    <header>
      <img src="./assets/logo.png">
      <h1 style="font-weight: 100">m-dialog 模态框组件</h1>
      <div style="margin-bottom: 50px;">
        <a :href="repo" target="_blank"><m-button type="info" size="large" round>Github</m-button></a>
        &nbsp;
        <a href="#events"><m-button type="warning" size="large" plain round>Example</m-button></a>
      </div>
    </header>
    <main class="doc-block">
      <readme />
      <!-- <Doc/> -->
      <m-dialog
        title="This is info message !"
        :show.sync="show2"
        auto-width
        >
        <span>This is content.</span>
        </m-dialog>
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
            <m-button type="info" @click="show2 = true">确定</m-button>
          </div>
          
        </div>
      </m-dialog>
      
      <m-button @click="show = !show" type="info">modal</m-button>
      <m-button @click="show2 = !show2" type="info">modal2</m-button>
      <m-button @click="$alert('Alert 消息框')">alert</m-button>
      <p>
        <label><input type="checkbox" v-model="appendToBody">append-to-body</label>
        <label><input type="checkbox" v-model="noHead">no-head </label>
        <label><input type="checkbox" v-model="closeOnClickModal">close-on-click-modal </label>
        <label><input type="checkbox" v-model="closeOnPressEscape">close-on-press-escape </label>
      </p>
    </main>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from './components/footer'
import ForkLink from './components/fork-link'
import Readme from '~/README.md'
// import Doc from './doc.md'
import pkg from '~/package.json'

export default {
  name: 'App',
  components: {
    // Doc,
    Readme,
    LayoutFooter,
    ForkLink
  },
  data () {
    return {
      pkg,
      show: false,
      show2: false,
      appendToBody: false,
      noHead: false,
      closeOnClickModal: true,
      closeOnPressEscape: true
    }
  },
  methods: {
    close (done) {
      console.log('before-close')
      done()
    },
    onOpen () {
      console.log('open')
    },
    onClose () {
      console.log('close')
    }
  },
  computed: {
    repo () {
      return pkg.repository.url.replace(/git\+/, '')
    }
  }
}
</script>
