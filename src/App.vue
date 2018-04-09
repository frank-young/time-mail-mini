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
                this.$store.commit('set')
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
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
