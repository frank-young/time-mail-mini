<template>
  <div class="ucenter">
    <div class="header">
      <div class="header-wrap" @click="toLetterList">
        <image class="header-image" src="/static/images/back.png"></image>
        <span class="header-text">我的</span>
      </div>
    </div>
    <div class="ucenter-box">
      <div class="ucenter-box-header">
        <div class="ucenter-avatar">
          <image class="ucenter-image" :src="userInfo.avatar"></image>
        </div>
        <div class="ucenter-name">
          <div class="">
            {{ userInfo.nickname }}
          </div>
          <div class="ucenter-name-desc">
            你的梦想，是一件很伟大的事！
          </div>
        </div>
      </div>
      <div class="ucenter-ul">
        <div class="ucenter-li"  @click="toQuestion">
          <div class="ucenter-text">
            常见问题
          </div>
        </div>
        <div class="ucenter-li" @click="toAboutUs">
          <div class="ucenter-text">
            关于我们
          </div>
        </div>
      </div>
      <div class="ucenter-ul">
        <div class="ucenter-li" @click="toRoast">
          <div class="ucenter-text">
            意见反馈
          </div>
        </div>
      </div>
      <div class="ucenter-ul">
        <div class="ucenter-li"  @click="toShare">
          <button class="ucenter-text" open-type="share">
            推荐给好友
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {

  },
  computed: {
    userInfo () {
      return wx.getStorageSync('userInfo')
    },
    configText () {
      return wx.getStorageSync('configText')
    }
  },
  methods: {
    toQuestion () {
      wx.navigateTo({
        url: '/pages/question/main'
      })
    },
    toAboutUs () {
      wx.navigateTo({
        url: '/pages/aboutus/main'
      })
    },
    toRoast () {
      wx.navigateToMiniProgram({
        appId: 'wx8abaf00ee8c3202e',
        extraData: {
          id: '28278'
        },
        envVersion: 'release',
        success (res) {}
      })
    },
    toLetterList () {
      wx.redirectTo({
        url: '/pages/letter/main'
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: this.configText.share_message,
      path: '/pages/letter/main',
      imageUrl: '/static/images/bg.jpg'
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/asset/less/style.less';

.ucenter {
  &-box {
    padding: 20rpx;
  }
  &-box-header {
    display: flex;
    padding: 20rpx;
    background-color: #fff;
    box-shadow: 0 0 4rpx #ccc;
  }
  &-avatar {
    width: 100rpx;
    height: 100rpx;
    flex: 0 0 100rpx;
    margin-right: 30rpx;
    overflow: hidden;
  }
  &-image {
    width: 100%;
    height: 100%;
  }
  &-name {
    flex: 1;
    font-size: 32rpx;
  }
  &-name-desc {
    padding-top: 20rpx;
    font-size: 28rpx;
    color: #999;
  }
  &-ul {
    padding: 20rpx 0 0 0;
  }
  &-li {
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 4rpx #ccc;
    font-size: 28rpx;
    &::after {
      content: '';
      position: absolute;
      right: 30rpx;
      top: 42rpx;
      width: 15rpx;
      height: 15rpx;
      border-top: 2rpx solid #bbb;
      border-right: 2rpx solid #bbb;
      transform: rotate(45deg);
    }
  }
  &-icon {
    flex: 0 0 22px;
    width: 22px;
    height: 22px;
    margin-right: 20px;
    overflow: hidden;
  }
  &-icon-image {
    width: 100%;
    height: 100%;
  }
  &-text {
    padding: 36rpx 20rpx;
    background-color: #fff;
    border: none;
    line-height: 1em;
    text-align: left;
    font-size: 28rpx;
    color: #333;
    margin: 0;
    &:after {
      display: none;
    }
  }
}
</style>
