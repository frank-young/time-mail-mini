<script>
import API from '@/api'

export default {
  created () {
    // this.getUserInfo()
    this.getPrompt()
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (res) => {
          wx.getUserInfo({
            success: (res2) => {
              this.userInfo = res2.userInfo
              API.loginByWeixin({code: res.code, userInfo: res2})
              .then(res => {
                wx.setStorageSync('userInfo', res.data.userInfo)
                wx.setStorageSync('token', res.data.token)
              })
            }
          })
        }
      })
    },
    async getPrompt () {
      try {
        const res = await API.getPrompt()
        if (res.data) {
          wx.setStorageSync('configText', res.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
page {
  padding-top: 70px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f9f9f9;
}
</style>
