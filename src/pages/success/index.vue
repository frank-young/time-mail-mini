<template>
  <div class="success">
    <div class="success-box">
      <div class="success-icon">
        <image class="success-image" src="/static/images/emoji-1.png" alt=""></image>
      </div>
      <div class="success-text">
        寄送成功
      </div>
      <div class="success-btn-group">
        <button class="success-btn" type="button" @click="toLetter">
          浏览公开信件
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    toLetter () {
      wx.reLaunch({
        url: '/pages/letter/main'
      })
    }
  }
}
</script>

<style lang="less">
.success {
  height: 100vh;
  background-color: #fff;
  &-box {

  }
  &-icon {
    text-align: center;
    padding: 100rpx 0 50rpx;
  }
  &-image {
    width: 300rpx;
    height: 300rpx;
    margin: 0 auto;
  }
  &-text {
    text-align: center;
  }
  &-btn-group {
    padding: 40rpx;
  }
  &-btn {

  }
}
</style>
