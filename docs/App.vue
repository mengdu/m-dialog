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
      <m-dialog
        title="This is info message !"
        :show.sync="show2"
        auto-width
        >
        <span>This is content.</span>&nbsp;
        <m-button @click="show3 = !show3" size="mini" type="info">Preview</m-button>
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
            <m-button plain @click="handleConfirm1">取消</m-button>
            <m-button type="info" @click="show2 = true">确定</m-button>
          </div>
          
        </div>
      </m-dialog>
      
      <m-dialog
        title="预览"
        auto-width
        no-head
        :show.sync="show3"
        >
          <img src="https://avatars0.githubusercontent.com/u/11366654?s=460&v=4" alt=""/>
        </m-dialog>

      <m-dialog
        title="Iframe"
        :show.sync="show4"
        auto-width
        >
         <iframe src="https://www.lanyueos.com/" frameborder="0" style="width: 1000px;height: 600px;"></iframe>
        </m-dialog>

      <m-button @click="show = !show" size="small" type="info">modal</m-button>
      <m-button @click="show2 = !show2" size="small" type="info">modal2</m-button>
      <m-button @click="show3 = !show3" size="small" type="info">modal3</m-button>
      <m-button @click="show4 = !show4" size="small" type="info">Iframe</m-button>
      <m-button @click="handleAlert1" size="small" type="danger">alert</m-button>
      <m-button @click="handleConfirm1" size="small" type="success">confirm</m-button>

      <p>
        <m-button @click="handleConfirm2" size="small" type="success">列队多个对话框</m-button>
        <m-button @click="handleConfirm3" size="small" type="success">多个对话框（不列队）</m-button>
      </p>
      <p>
        <label><input type="checkbox" v-model="appendToBody">append-to-body</label>
        <label><input type="checkbox" v-model="noHead">no-head </label>
        <label><input type="checkbox" v-model="isMiddle">is-middle</label>
        <label><input type="checkbox" v-model="closeOnClickModal">close-on-click-modal </label>
        <label><input type="checkbox" v-model="closeOnPressEscape">close-on-press-escape </label>
      </p>
    </main>
    <main class="doc-block">
      <readme />
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

function sleep (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve()
    }, time);
  })
}

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
      show3: false,
      show4: false,
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
        iconType: 'question',
        callback (type) {
          console.log('alert cb')
        }
      })
    },
    handleConfirm1 () {
      this.$confirm('你确定要退出么？', {
        title: '警告',
        closeOnPressEscape: true,
        confirmButtonType: 'danger',
        confirmButtonClassName: 'm-button m-button-info',
        iconType: 'error',
      }).then(() => {
        console.log('confirm')
        // alert('确认了操作')

        setTimeout(() => {
          this.show = false
        }, 500)
      }).catch(() => {
        console.log('cancel')
        // alert('取消了操作')
      })
    },

    handleConfirm2 () {
      this.$confirm('Are you sure ?', { title: '对话框1', iconType: 'question' })
      this.$confirm('Are you sure ?', { title: '对话框2', iconType: 'question', isMiddle: false })
      this.$confirm('Are you sure ?', { title: '对话框3', iconType: 'question', width: '250px' })
    },
    async handleConfirm3 () {
      this.$confirm.confirm('Are you sure ?', { title: '对话框1', iconType: 'question' })
      await sleep(500)
      this.$confirm.confirm('Are you sure ?', { title: '对话框2', iconType: 'info', isMiddle: false })
      await sleep(500)
      this.$confirm.confirm('Are you sure ?', { title: '对话框3', iconType: 'question', width: '250px' })
      await sleep(500)
      this.$confirm.confirm('Are you sure ?', { title: '对话框4', iconType: 'question', width: '450px' })
    }
  },
  computed: {
    repo () {
      return pkg.repository.url.replace(/git\+/, '')
    }
  }
}
</script>
