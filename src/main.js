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
      '^pages/index/main',
      'pages/success/main',
      'pages/ucenter/main',
      'pages/letter/main',
      'pages/detail/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0D45E4',
      navigationBarTitleText: '时光邮件',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      backgroundColor: '#ffffff',
      borderStyle: 'gary',
      selectedColor: '#0D45E4',
      color: '#666',
      list: [
        {
          pagePath: 'pages/index/main',
          iconPath: 'static/images/icon/edit.png',
          selectedIconPath: 'static/images/icon/edit-hover.png',
          text: '写'
        },
        {
          pagePath: 'pages/letter/main',
          iconPath: 'static/images/icon/find.png',
          selectedIconPath: 'static/images/icon/find-hover.png',
          text: '读'
        },
        {
          pagePath: 'pages/ucenter/main',
          iconPath: 'static/images/icon/user.png',
          selectedIconPath: 'static/images/icon/user-hover.png',
          text: '我'
        }
      ]
    }
  }
}
