import { createApp } from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
// 全局样式
import '@/assets/css/index.scss'
// 按需引入vant
import { vant } from '@/config/vant.config'
// 1. 引入FastClick
import FastClick from 'fastclick'
// 2. 配置FastClick
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      FastClick.attach(document.body)
    },
    false
  )
}

const app = createApp(App)
app
  .use(store)
  .use(router)
  .use(VueLazyload, {
    preLoad: 1.3,
    error: require('assets/img/common/n-photo.jpeg'),
    loading: require('assets/img/common/loading.gif'),
    attempt: 1
  })
  .mount('#app')
vant(app) // 按需引入vant
