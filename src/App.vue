<script>
import API from '@/api'

export default {
  created () {
    this.getUserInfo()
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
    }
  }
}
</script>

<style>
page {
  background-color: #0D45E4;
}
</style>
