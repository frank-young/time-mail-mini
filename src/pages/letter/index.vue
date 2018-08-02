<template>
  <div class="letter">
    <div class="header">
      <div class="letter-header" @click="toUcenterInfo">
        <div class="letter-header-avatar">
          <open-data class="letter-header-image" type="userAvatarUrl"></open-data>
        </div>
        <div class="letter-header-name">
          <open-data type="userNickName"></open-data>
        </div>
      </div>
    </div>
    <div class="letter-sub-title">
      <image class="letter-sub-title-image" src="/static/images/icon/edit-hover.png"></image>
      {{ configText.text1 }}
    </div>
    <div class="v-modal" v-if="needPermision">
      <div class="v-modal-content">
        <div class="v-modal-title">
          {{ tipsMsg }}
        </div>
        <button class="v-modal-btn" open-type="getUserInfo" @getuserinfo="setPermision">点我</button>
      </div>
    </div>
    <div v-if="!~~configText.audit_switch" class="letter-empty">
      {{ configText.text3 }}
    </div>
    <div v-else class="letter-main">
      <div class="letter-ul">
        <div class="letter-li" v-for="letter in letters" :key="letter.id">
          <div class="letter-content">
            {{ letter.content }}
          </div>
          <div class="letter-meta">
            寄往{{ letter.arrive_date }}年
          </div>
        </div>
        <div v-if="loading || isLastPage" class="letter-loading">
          {{ loadingText }}
        </div>
      </div>
      <div class="letter-btn-group">
        <div class="letter-btn" @click="toWrite">
          我也要写
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'

const ERR_MSG = 'getUserInfo:ok'

export default {
  data () {
    return {
      letters: [],
      page: {
        page: 1,
        page_size: 15
      },
      loading: false,
      isLastPage: false,
      loadingText: '玩命加载中...',
      needPermision: false,
      tipsMsg: '一键快速登录'
    }
  },
  onShow () {
    this.page.page = 1
    this.letters = []
    this.getPublicLetters()
  },
  onPullDownRefresh () {
    this.page.page = 1
    this.letters = []
    this.isLastPage = false
    this.getPublicLetters()
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.getPublicLetters()
  },
  mounted () {
  },
  computed: {
    // 默认配置文字
    configText () {
      return wx.getStorageSync('configText')
    }
  },
  methods: {
    setPermision (e) {
      if (e.target.errMsg === ERR_MSG) {
        this.needPermision = false
        this.loginByWeixin()
        wx.navigateTo({
          url: '/pages/index/main'
        })
      } else {
        this.tipsMsg = '需要点击“允许”哟～'
      }
    },
    async getPublicLetters () {
      if (this.loading) return
      try {
        this._isLoading()
        const res = await API.getPublicLetters({include: 'wxuser', ...this.page})
        this.loading = false
        if (res.status && res.data.data.length) {
          this.letters = [...this.letters, ...res.data.data]
          this.page.page += 1
        } else {
          this._isLastPage()
        }
      } catch (e) {
        console.log(e)
      }
    },
    toWrite () {
      this.needPermision = !Object.keys(wx.getStorageSync('userInfo')).length
      if (this.needPermision) return
      wx.navigateTo({
        url: '/pages/index/main'
      })
    },
    toUcenterInfo () {
      wx.navigateTo({
        url: '/pages/ucenter/main'
      })
    },
    _isLoading () {
      this.loading = true
      this.loadingText = '玩命加载中...'
    },
    _isLastPage () {
      this.isLastPage = true
      this.loadingText = '已没有更多的梦想了～'
    },
    loginByWeixin () {
      wx.login({
        success: (res) => {
          wx.getUserInfo({
            success (res2) {
              API.loginByWeixin({code: res.code, userInfo: res2})
              .then(res => {
                wx.setStorageSync('userInfo', res.data.userInfo)
                wx.setStorageSync('token', res.data.token)
              })
            },
            fail (err) {
              console.log(err)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/asset/less/style.less';
.letter {
  &-header {
    position: absolute;
    bottom: 15rpx;
    left: 30rpx;
    z-index: 20;
    height: 60rpx;
    padding: 5rpx 30rpx;
    display: inline-block;
    background-color: #fff;
    border-radius: 80rpx;
    box-shadow: 0 0 4rpx #eee;
  }
  &-header-avatar {
    display: inline-block;
    width: 50rpx;
    height: 50rpx;
    margin-right: 20rpx;
    border-radius: 50%;
    vertical-align: middle;
    overflow: hidden;
  }
  &-header-image {
    width: 100%;
    height: 100%;
  }
  &-header-name {
    display: inline;
    font-size: 24rpx;
    vertical-align: middle;
    color: #666;
  }
  &-sub-title {
    color: #999;
    font-size: 24rpx;
    padding: 20rpx;
    &-image {
      display: inline-block;
      width: 30rpx;
      height: 30rpx;
      margin-right: 10rpx;
    }
  }
  &-ul {
    padding: 0 20rpx 150rpx 20rpx;
  }
  &-li {
    padding: 20rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    box-shadow: 0 0 4rpx #ccc;
    border-radius: 4rpx;
    font-size: 14px;
    color: #666;
  }
  &-content {
    padding: 10rpx 0;
    line-height: 2em;
  }
  &-meta {
    text-align: right;
    color: #999;
  }
  &-loading {
    padding: 20rpx;
    text-align: center;
    font-size: 24rpx;
    color: #999;
  }
  &-btn-group {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    padding: 30rpx;
    box-shadow: 0 0 4rpx #ccc;
    box-sizing: border-box;
    background-color: #f9f9f9;
  }
  &-btn {
    height: 90rpx;
    line-height: 90rpx;
    font-size: 28rpx;
    text-align: center;
    background-color: #0D45E4;
    color: #fff;
  }
}
.v-modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.5);
  &-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    z-index: 40;
    padding: 30rpx;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
  &-title {
    font-size: 16px;
    line-height: 2em;
    margin-bottom: 20rpx;
    text-align: center;
  }
  &-btn {
    border-radius: 4rpx;
    background-color: #0D45E4;
    color: #fff;
    font-size: 14px;
  }
}
.letter-empty {
  margin: 200rpx 40rpx;
  padding: 40rpx;
  text-align: center;
  color: #666;
  font-size: 32rpx;
  border-radius: 8rpx;
  box-shadow: 0 0 8rpx #ccc;
  background-color: #fff;
}
</style>
