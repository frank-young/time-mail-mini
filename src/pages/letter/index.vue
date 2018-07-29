<template>
  <div class="letter">
    <div class="header">
      <div class="letter-header" @click="toUcenterInfo">
        <div class="letter-header-avatar">
          <image class="letter-header-image" :src="userInfo.avatar"></image>
        </div>
        <div class="letter-header-name">
          {{ userInfo.nickname }}
        </div>
      </div>
    </div>
    <div class="letter-sub-title">
      <image class="letter-sub-title-image" src="/static/images/icon/edit-hover.png"></image>
      公开信件
    </div>
    <div class="letter-main">
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
    </div>
    <div class="letter-btn-group">
      <div class="letter-btn" @click="toWrite">
        我也要写
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'

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
      loadingText: '玩命加载中...'
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
  created () {
  },
  computed: {
    userInfo () {
      return wx.getStorageSync('userInfo')
    }
  },
  methods: {
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
    font-size: 12px;
    color: #666;
  }
  &-content {
    padding: 10rpx 0;
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
</style>
