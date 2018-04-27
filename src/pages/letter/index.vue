<template>
  <div class="letter">
    <div class="letter-main">
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
                {{ letter.like_count }} ❤️
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
  components: {
  },
  data () {
    return {
      letters: []
    }
  },
  created () {
    this.getPublicLetters()
  },
  methods: {
    getPublicLetters () {
      API.getPublicLetters({include: 'wxuser'})
      .then(res => {
        if (res.status_code === 200) {
          this.letters = res.data.data
        }
      })
    },
    // 跳转详情
    toDetail (id) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + id
      })
    }
  }
}
</script>

<style lang="less">
.letter {
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
    color: #0D45E4;
  }
}
</style>
