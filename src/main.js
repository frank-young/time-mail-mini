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
      backgroundColor: '#fafafa',
      borderStyle: 'white',
      selectedColor: '#e02f25',
      color: '#666',
      list: [
        {
          pagePath: 'pages/index/main',
          iconPath: 'static/images/icon/ic_menu_choice_nor.png',
          selectedIconPath: 'static/images/icon/ic_menu_choice_pressed.png',
          text: '写'
        },
        {
          pagePath: 'pages/letter/main',
          iconPath: 'static/images/icon/ic_menu_sort_nor.png',
          selectedIconPath: 'static/images/icon/ic_menu_sort_pressed.png',
          text: '读'
        },
        {
          pagePath: 'pages/ucenter/main',
          iconPath: 'static/images/icon/ic_menu_me_nor.png',
          selectedIconPath: 'static/images/icon/ic_menu_me_pressed.png',
          text: '我'
        }
      ]
    }
  }
}
