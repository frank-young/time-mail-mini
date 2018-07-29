<template>
  <div class="success">
    <div class="header">
      <div class="header-wrap" @click="navigateBack">
        <span class="header-text">信件已保存</span>
      </div>
    </div>
    <div class="success-tips">
      我们维护了一个公众号社区，欢迎大家的加入，一起见证我们的梦想。或者直接搜索微信号：yangjunalns
      <div class="success-tips-btn" @click="copyCtrl">
        点击复制
      </div>
      备注时光邮件。
    </div>
    <div class="success-qrcode-text">
      长按保存二维码
    </div>
    <div class="success-qrcode">
      <image @click="saveImage" class="success-qrcode-image" src="/static/images/qrcode.jpg" alt=""></image>
    </div>
    <div class="success-box">
      <div class="success-text">
        信件已保存，将在指定时间寄出
      </div>
      <div class="success-btn-group">
        <button class="success-btn" open-type="share">
          推荐给朋友
        </button>
      </div>
      <div class="success-btn-group">
        <button class="success-home-btn" type="button" @click="toLetter">
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  computed: {
    configText () {
      return wx.getStorageSync('configText')
    }
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
    toLetter () {
      wx.reLaunch({
        url: '/pages/letter/main'
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
        data: 'yangjunalns',
        success () {
          wx.showToast({
            title: '复制微信号成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: this.configText.share_message,
      path: '/pages/index/main',
      imageUrl: '/static/images/bg.jpg'
    }
  }
}
</script>

<style lang="less">
@import '~@/asset/less/style.less';

.success {
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
    padding: 30rpx 30rpx 0 30rpx;
  }
  &-btn {
    padding: 15rpx;
    background-color: #0D45E4;
    color: #fff;
    font-size: 14px;
  }
  &-home-btn {
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
