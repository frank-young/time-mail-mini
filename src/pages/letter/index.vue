<template>
  <div class="letter">

    <div class="letter-main">
      <div class="letter-empty" v-if="letters.length === 0">
        <image class="letter-empty-icon" src="/static/images/empty-letter.png"></image>
        <div class="">

        </div>
      </div>
      <div class="letter-ul" v-else>
        <div class="letter-li" v-for="letter in letters" :key="letter.id">
          <div class="letter-box" @click="toDetail(letter.id)">
            <div class="letter-avatar">
              <image class="letter-image" :src="letter.wxuser.data.avatar"></image>
            </div>
            <div class="letter-content">
              <div class="letter-title">
                {{ letter.meta }}
              </div>
              <div class="letter-desc">
                {{ letter.description }}
              </div>
              <div class="letter-meta">
                <div class="letter-meta-left">
                    写于{{ letter.create_date }}
                </div>
                <div class="letter-meta-right">
                  <image class="letter-meta-right-icon" src="/static/images/heart.png"></image>
                  <div class="letter-meta-right-text">
                    {{ letter.like_count }} 人喜欢
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'
// import miment from 'miment'

export default {
  data () {
    return {
      letters: [],
      configText: {
        text1: ''
      },
      page: {
        page: 1,
        page_size: 15
      },
      loading: false
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
    this.getPublicLetters()
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.getPublicLetters()
  },
  created () {
    this.getPrompt()
  },
  methods: {
    async getPublicLetters () {
      try {
        const res = await API.getPublicLetters({include: 'wxuser', ...this.page})
        if (res.status_code === 200 && res.data.data.length !== 0) {
          this.letters = [...this.letters, ...res.data.data]
          this.page.page += 1
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 跳转详情
    toDetail (id) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + id
      })
    },
    async getPrompt () {
      try {
        const res = await API.getPrompt()
        if (res.data !== null) {
          this.configText = res.data
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.letter {
  .tips {
    padding: 30rpx 100rpx;
    line-height: 1.7em;
    text-align: center;
    color: #fff;
    background-color: #0D45E4;
    // background: linear-gradient(180deg, #0D45E4, #3D45E4);
    font-size: 40rpx;
    letter-spacing: 8px;
  }
  min-height: 100vh;
  /* background-color: #eceff1; */
  &-main {
  }
  &-li {
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;
  }
  &-box {
    display: flex;
  }
  &-avatar {
    flex: 0 0 90rpx;
    width: 90rpx;
    height: 90rpx;
    margin-right: 30rpx;
    padding: 2rpx;
  }
  &-image {
    width: 90rpx;
    height: 90rpx;
  }
  &-content {
    width: 100%;
  }
  &-title {
    font-size: 28rpx;
    color: #888;
  }
  &-desc {
    font-size: 28rpx;
    line-height: 1.5em;
    padding: 10rpx 0;
  }
  &-meta {
    display: flex;
    font-size: 12px;
  }
  &-meta-left {
    flex: 1;
    color: #999;
  }
  &-meta-right {
    flex: 1;
    text-align: right;
  }
  &-meta-right-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  &-meta-right-text {
    position: relative;
    top: -6px;
    display: inline-block;
    font-size: 12px;
    color: #888;
  }
  &-empty {
    width: 120px;
    height: 120px;
    margin: 100px auto;
    font-size: 14px;
    color: #888;
    text-align: center;
  }
  &-empty-icon {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
  }
}
</style>
