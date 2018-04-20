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
        欢迎您成为时光邮件第一批用户❤️，为了做好服务，邀请您加入我们的社区👇，关注公众号：时光邮件
        <div class="success-tips-btn" @click="copyCtrl">
          点击复制
        </div>
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
      isShow: false,
      toastMsg: ''
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
    },
    copyCtrl () {
      wx.setClipboardData({
        data: '时光邮件',
        success () {}
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '给10年后的自己写一封信如何？',
      path: '/pages/index/main',
      imageUrl: '/static/images/bg.jpg'
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
    padding: 15rpx;
    background-color: #fff;
    color: #666;
    font-size: 14px;
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
  &-tips-btn {
    display: inline-block;
    border: 1px solid #eee;
    padding: 0 20rpx;
    border-radius: 20px;
    background-color: #fff;
    color: #333;
    font-size: 10px;
  }
}
</style>
