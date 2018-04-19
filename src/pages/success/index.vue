<template>
  <div class="success">
    <div class="success-box">
      <div class="success-icon">
      </div>
      <div class="success-text">
        信件将会准时发送到您的邮箱～
      </div>
      <div class="success-btn-group">
        <button class="success-btn" type="button" @click="toIndex">
          返回首页
        </button>
      </div>
      <div class="success-tips">
        欢迎您成为时光邮件第一批用户❤️，为了做好服务，邀请您加入我们的社区👇，或者关注公众号：时光邮件
      </div>
      <div class="success-qrcode-text">
        截图保存二维码
      </div>
      <div class="success-qrcode">
        <image @click="saveImage" class="success-qrcode-image" src="/static/images/qrcode.jpg" alt=""></image>
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
    toIndex () {
      wx.reLaunch({
        url: '/pages/index/main'
      })
    },
    saveImage () {
      wx.saveImageToPhotosAlbum({
        success (res) {
          console.log(res)
        }
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
    padding: 40rpx 0 40rpx;
  }
  &-image {
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto;
  }
  &-text {
    text-align: center;
    font-size: 16px;
    padding: 0 15px;
    line-height: 1.7em;
  }
  &-btn-group {
    padding: 30rpx;
  }
  &-btn {

  }
  &-tips {
    padding: 30rpx;
    font-size: 16px;
    line-height: 1.7em;
  }
  &-qrcode {
    text-align: center;
    padding: 0 0 40rpx;
  }
  &-qrcode-image {
    width: 500rpx;
    height: 500rpx;
    margin: 0 auto;
  }
  &-qrcode-text {
    font-size: 14px;
    text-align: center;
    line-height: 20px;
  }
}
</style>
