<template>
  <div class="detail">
    <div class="detail-main">
      <div class="detail-box">
        <div class="detail-title">
          {{ letter.title }}
        </div>
        <div class="detail-avatar">
          <image class="detail-image" :src="letter.wxuser.data.avatar"></image>
        </div>
        <div class="detail-content">
          <div class="detail-desc">
            {{ letter.content }}
          </div>
          <div class="detail-meta">
            {{ letter.like_count }} 人喜欢  {{ letter.comment_count }} 人评论
          </div>
        </div>
        <div class="detail-comment">

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
      letter: {
        wxuser: {
          data: {
            avatar: ''
          }
        }
      }
    }
  },
  mounted () {
    this.getLetter(this.$root.$mp.query.id)
  },
  methods: {
    getLetter (id) {
      API.getLetter({ id, include: 'wxuser' })
      .then(res => {
        if (res.status_code === 200) {
          this.letter = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="less">
.detail {
  min-height: 100vh;
  &-main {
    padding: 30rpx;
  }
  &-box {

  }
  &-title {
    margin-bottom: 20rpx;
    font-size: 36rpx;
    color: #333;
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
  &-desc {
    font-size: 28rpx;
    padding: 10rpx 0;
  }
  &-meta {
    font-size: 12px;
  }
}
</style>
