// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import DemoBlock from './components/demo-block'
import Component from '@/index'
import MButton from 'vue-m-button'
import './assets/common.css'

Vue.use(Component)
Vue.use(MButton)

Vue.component('DemoBlock', DemoBlock)
Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

window.app = app
