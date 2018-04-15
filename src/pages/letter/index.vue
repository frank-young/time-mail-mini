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
              {{ letter.title }}
            </div>
            <div class="letter-desc">
              {{ letter.content }}
            </div>
            <div class="letter-meta">
              {{ letter.like_count }} 人喜欢  {{ letter.comment_count }} 人评论
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'

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
    padding: 30rpx;
  }
  &-li {
    margin-bottom: 30rpx;
    box-shadow: 0 0 6px #eee;
    border: 1rpx solid #eee;
  }
  &-box {
    padding: 30rpx;
    display: flex;
  }
  &-avatar {
    flex: 0 0 100rpx;
    width: 100rpx;
    height: 100rpx;
    margin-right: 30rpx;
    padding: 2rpx;
    border: 1rpx solid #eee;
    border-radius: 50%;
  }
  &-image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }
  &-content {

  }
  &-title {
    font-size: 36rpx;
    color: #333;
  }
  &-desc {
    font-size: 28rpx;
    padding: 10rpx 0;
  }
  &-meta {
    font-size: 12px;
    color: #0D45E4;
  }
}
</style>
