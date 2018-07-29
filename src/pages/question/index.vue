<template>
  <div class="ucenter">
    <div class="header">
      <div class="header-wrap" @click="navigateBack">
        <image class="header-image" src="/static/images/back.png"></image>
        <span class="header-text">常见问题</span>
      </div>
    </div>
    <div class="ucenter-box">
      <div class="ucenter-ul">
        <div class="ucenter-li" v-for="(item, index) in QUESTION_LIST" :key="index" @click="toQuestion">
          <div class="ucenter-li-title">
            {{ item.question }}
          </div>
          <div class="ucenter-li-text">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QUESTION_LIST } from './config'

export default {
  data () {
    return {
      QUESTION_LIST
    }
  },
  methods: {
    navigateBack () {
      wx.navigateBack({
        url: '/pages/letter/main'
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/asset/less/style.less';

.ucenter {
  min-height: 100vh;
  background-color: #f9f9f9;
  &-box {
    padding: 20rpx;
  }
  &-box-header {
    display: flex;
    padding: 20rpx;
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
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
    font-size: 24rpx;
    color: #999;
  }
  &-ul {
    padding: 20rpx 0 0 0;
  }
  &-li {
    position: relative;
    padding: 26rpx 20rpx;
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    font-size: 14px;
    margin-bottom: 20rpx;
    &-title {
      margin-bottom: 20rpx;
    }
    &-text {
      color: #999;
      line-height: 2em;
    }
  }
}
</style>
