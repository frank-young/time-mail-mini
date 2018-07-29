import Vue from 'vue'
import App from './App'
import store from '@/store'

Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      '^pages/letter/main',
      'pages/index/main',
      'pages/success/main',
      'pages/ucenter/main',
      'pages/detail/main',
      'pages/question/main',
      'pages/aboutus/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0D45E4',
      navigationBarTitleText: '时光邮件',
      navigationBarTextStyle: 'white',
      navigationStyle: 'custom'
    }
  }
}
