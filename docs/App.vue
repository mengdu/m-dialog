<template>
  <div id="app">
    <fork-link :repo="repo" />
    <header>
      <img src="./assets/logo.png">
      <h1 style="font-weight: 100">m-dialog 弹框组件</h1>
      <div style="margin-bottom: 50px;">
        <a :href="repo" target="_blank"><m-button type="info" size="large" round>Github</m-button></a>
        &nbsp;
        <a href="#example"><m-button type="warning" size="large" plain round>Example</m-button></a>
      </div>
    </header>
    <main class="doc-block">
      <readme />
      <!-- <m-dialog
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
        :is-middle="isMiddle"
        margin-top="5vh"
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
      <m-button @click="handleAlert1">alert</m-button>
      <m-button @click="handleConfirm1">confirm</m-button>
      <p>
        <label><input type="checkbox" v-model="appendToBody">append-to-body</label>
        <label><input type="checkbox" v-model="noHead">no-head </label>
        <label><input type="checkbox" v-model="isMiddle">is-middle</label>
        <label><input type="checkbox" v-model="closeOnClickModal">close-on-click-modal </label>
        <label><input type="checkbox" v-model="closeOnPressEscape">close-on-press-escape </label>
      </p> -->
    </main>
    <main class="doc-block">
      <doc />
    </main>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from './components/footer'
import ForkLink from './components/fork-link'
import Readme from '~/README.md'
import Doc from './doc.md'
import pkg from '~/package.json'

export default {
  name: 'App',
  components: {
    Doc,
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
      closeOnPressEscape: true,
      isMiddle: false
    }
  },
  methods: {
    close (type, done) {
      console.log('before-close:', type)
      done()
    },
    onOpen () {
      console.log('open')
    },
    onClose (type) {
      console.log('close', type)
    },
    handleAlert1 () {
      this.$alert('Alert 消息框：<strong>加粗显示</strong>', {
        hasCancelButton: true,
        supperHTMLString: true,
        callback (type) {
          console.log('alert cb')
        }
      })
    },
    handleConfirm1 () {
      this.$confirm('你确定要删除么？', {
        title: '警告',
        closeOnPressEscape: true,
        confirmButtonType: 'danger',
        typeIcon: 'danger',
      }).then(() => {
        console.log('confirm')
        // alert('确认了操作')
      }).catch(() => {
        console.log('cancel')
        // alert('取消了操作')
      })
    }
  },
  computed: {
    repo () {
      return pkg.repository.url.replace(/git\+/, '')
    }
  }
}
</script>
