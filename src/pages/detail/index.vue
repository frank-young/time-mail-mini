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
            <div class="detail-like">
              <like-btn @click="toggleLike" :is-like.sync="isLike" :count.sync="letter.like_count"></like-btn>
            </div>
            <!-- {{ letter.comment_count }} 人评论 -->
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
import LikeBtn from '@/components/like-btn'

export default {
  components: {
    LikeBtn
  },
  data () {
    return {
      letter: {
        like_count: 0,
        wxuser: {
          data: {
            avatar: ''
          }
        }
      },
      isLike: false,
      letterId: 0
    }
  },
  mounted () {
    this.letterId = this.$root.$mp.query.id
    this.getLetter(this.letterId)
  },
  methods: {
    getLetter (id) {
      API.getLetter({ id, include: 'wxuser' })
      .then(res => {
        if (res.status_code === 200) {
          this.letter = res.data.data
          this.isLike = this.letter.is_like === 1
        }
      })
    },
    toggleLike () {
      this.isLike = !this.isLike
      this.isLike ? this.letter.like_count++ : this.letter.like_count--
      this.isLike ? this.like() : this.dislike()
    },
    like () {
      API.like({letter_id: this.letterId})
    },
    dislike () {
      API.dislike({letter_id: this.letterId})
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
    margin: 30rpx 0;
  }
  &-like {
    // width: 400rpx;
    display: inline-block;
  }
}
</style>
