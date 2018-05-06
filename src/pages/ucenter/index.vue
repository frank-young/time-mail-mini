<template>
  <div class="ucenter">
    <div class="ucenter-box">
      <div class="ucenter-header">
        <div class="ucenter-avatar">
          <image class="ucenter-image" :src="userInfo.avatar"></image>
        </div>
        <div class="ucenter-name">
          {{ userInfo.nickname }}
        </div>
      </div>
      <div class="ucenter-ul">
        <div class="ucenter-li"  @click="toMyLetter">
          <div class="ucenter-icon">
            <image class="ucenter-icon-image" src="/static/images/letter.png"></image>
          </div>
          <div class="ucenter-text">
            我的信件
          </div>
        </div>
        <div class="ucenter-li" @click="toRoast">
          <div class="ucenter-icon">
            <image class="ucenter-icon-image" src="/static/images/roast.png"></image>
          </div>
          <div class="ucenter-text">
            意见反馈
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  components: {
    card
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {

  },
  mounted () {
    this.userInfo = wx.getStorageSync('userInfo')
    if (typeof this.userInfo.nickname !== 'undefined') {

    }
  },
  methods: {
    toMyLetter () {
    },
    toRoast () {
      wx.navigateToMiniProgram({
        appId: 'wx8abaf00ee8c3202e',
        extraData: {
          id: '28278'
        },
        envVersion: 'trial',
        success (res) {
        }
      })
    }
  }
}
</script>

<style lang="less">
.ucenter {
  &-box {
  }
  &-header {
    padding: 20px;
    text-align: center;
    color: #fff;
    background-color: #0D45E4;
  }
  &-avatar {
    width: 75px;
    height: 75px;
    margin: 0 auto 15px;
    border-radius: 50%;
    overflow: hidden;
  }
  &-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  &-name {
    font-size: 14px;
    text-align: center;
  }
  &-ul {
    padding: 0 15px;
  }
  &-li {
    display: flex;
    padding: 15px 0;
    border-bottom: 1rpx solid #eee;
    font-size: 14px;
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
    flex: 1;
  }
}
</style>
