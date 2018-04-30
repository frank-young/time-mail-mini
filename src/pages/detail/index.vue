<template>
  <div class="detail">
    <div class="detail-main">
      <div class="detail-box">
        <div class="detail-title">
          {{ letter.title }}
        </div>
        <div class="detail-auth">
          <div class="detail-auth-avatar">
            <image class="detail-image" :src="letter.wxuser.data.avatar"></image>
          </div>
          <div class="detail-auth-name">
            <div class="">
              {{ letter.wxuser.data.nickname }}
            </div>
            <div class="detail-auth-meta">
              写于{{ letter.create_date }},{{ letter.meta }}
            </div>
          </div>
        </div>
        <div class="detail-content">
          <div class="detail-desc">
            {{ letter.content }}
          </div>
          <div class="detail-meta">
            <div class="detail-like">
              <like-btn @click="toggleLike" :is-like.sync="letter.is_like" :count.sync="letter.like_count"></like-btn>
            </div>
          </div>
        </div>
        <div class="split">

        </div>
        <div class="detail-comment">
          <div class="comment-title">
            {{ letter.comment_count }} 人评论
          </div>
          <div class="comment-ul">
            <div class="comment-li" v-for="comment in comments" :key="comment.id">
              <div class="comment-box">
                <div class="comment-avatar">
                  <image class="comment-image" :src="comment.wxuser.data.avatar"></image>
                </div>
                <div class="comment-desc">
                  <div class="comment-name">
                    {{ comment.wxuser.data.nickname }}
                  </div>
                  <div class="comment-datetime">
                    {{ comment.time.date }}
                  </div>
                  <div class="comment-content">
                    {{ comment.content }}
                  </div>
                </div>
                <div class="comment-meta">
                  {{ comment.comment_like_count }} 点赞
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-add">
      <input v-model="commentContent" placeholder="支持ta的梦想～" class="comment-input" type="text"></input>
      <div class="comment-btn" @click="addComment">发送</div>
    </div>
    <toast :toast-msg.sync="toastMsg" :is-show.sync="isShow"></toast>
  </div>
</template>

<script>
import API from '@/api'
import LikeBtn from '@/components/like-btn'
import Toast from '@/components/toast'

const OK = 200

export default {
  components: {
    LikeBtn,
    Toast
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
      comments: [],
      letterId: 0,
      commentContent: '',
      // toast
      isShow: false,
      toastMsg: ''
    }
  },
  mounted () {
    this.letterId = this.$root.$mp.query.id
    this.getLetter()
  },
  methods: {
    async getLetter () {
      let { letter, comments } = await this._getData()
      letter.status_code === OK ? this.letter = letter.data.data : null
      comments.status_code === OK ? this.comments = comments.data.data : null
    },
    async _getData () {
      let letter = await API.getLetter({ id: this.letterId, include: 'wxuser' })
      let comments = await API.getComments({ letter_id: this.letterId, include: 'wxuser' })

      return { letter, comments }
    },
    toggleLike () {
      this.letter.is_like = !this.letter.is_like
      this.letter.is_like ? this.letter.like_count++ : this.letter.like_count--
      this.letter.is_like ? this.like() : this.dislike()
    },
    like () {
      API.like({letter_id: this.letterId})
    },
    dislike () {
      API.dislike({letter_id: this.letterId})
    },
    async addComment () {
      let res = await API.addComment({letter_id: this.letterId, content: this.commentContent})
      this.getLetter()
      this.show(res.message)
    },
    show (msg) {
      this.isShow = true
      this.toastMsg = msg
      this.commentContent = ''
      setTimeout(() => {
        this.isShow = false
      }, 2000)
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
  &-auth {
    width: 100%;
    display: flex;
    padding-bottom: 5px;
  }
  &-auth-avatar {
    flex: 0 0 80rpx;
    width: 80rpx;
    height: 80rpx;
    margin-right: 30rpx;
    padding: 2rpx;
    border: 1rpx solid #eee;
  }
  &-image {
    width: 80rpx;
    height: 80rpx;
  }
  &-auth-name {
    flex: 1;
    font-size: 14px;
  }
  &-auth-meta {
    padding: 5px 0;
    color: #999;
    font-size: 12px;
  }
  &-content {
    padding-bottom: 10px;
    line-height: 1.7em;
    font-size: 14px;
    text-indent: 2em;
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
  &-comment {
    padding-bottom: 50px;
  }
}

.comment {
  &-title {
    padding-top: 15px;
    font-size: 18px;
    color: #333;
  }
  &-ul {

  }
  &-li {
  }
  &-box {
    position: relative;
    display: flex;
    padding: 15px 0 0 0;
  }
  &-avatar {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  &-image {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  &-desc {
    flex: 1;
    padding-left: 15px;
    border-bottom: 1rpx solid #eee;
    &:last-of-type {
      border: none;
    }
  }
  &-name {
    color: #666;
    font-size: 12px;
  }
  &-datetime {
    color: #999;
    font-size: 10px;
  }
  &-content {
    padding: 10px 0;
    color: #333;
    font-size: 14px;
  }
  &-meta {
    position: absolute;
    right: 0;
    top: 15px;
    color: #888;
    font-size: 12px;
  }
  &-add {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1rpx solid #eee;
  }
  &-input {
    flex: 1;
    border-bottom: 1rpx solid #eee;
    padding: 5px 10px;
    font-size: 14px;
  }
  &-btn {
    width: 50px;
    flex: 0 0 50px;
    line-height: 42px;
    font-size: 14px;
    color: #666;
    margin-left: 10px;
    text-align: center;
  }
}
.split {
  height: 20px;
  margin: 0 -15px;
  background-color: #eee;
}
</style>
