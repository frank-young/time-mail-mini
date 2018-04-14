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
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
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
      backgroundColor: '#fafafa',
      borderStyle: 'white',
      selectedColor: '#e02f25',
      color: '#666',
      list: [
        {
          pagePath: 'pages/index/main',
          iconPath: 'static/images/icon/ic_menu_choice_nor.png',
          selectedIconPath: 'static/images/icon/ic_menu_choice_pressed.png',
          text: '首页'
        },
        {
          pagePath: 'pages/letter/main',
          iconPath: 'static/images/icon/ic_menu_me_nor.png',
          selectedIconPath: 'static/images/icon/ic_menu_me_pressed.png',
          text: '发现'
        },
        {
          pagePath: 'pages/ucenter/main',
          iconPath: 'static/images/icon/ic_menu_me_nor.png',
          selectedIconPath: 'static/images/icon/ic_menu_me_pressed.png',
          text: '我的'
        }
      ]
    }
  }
}
