<template>
  <div class="like-group" @click="toggleLike" :class="{'like-animation': isLike}">
    <div class="like-icon">
      <image class="like-image" src="/static/images/like.png"></image>
    </div>
    <div class="like-btn">
      喜欢
    </div>
    <div class="like-count">
      {{ count }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLike: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 1
    }
  },
  methods: {
    toggleLike () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes likechange {
    0% {
      left: 0;
    }
    100% {
      left: -950px;
    }
}

.like {
  &-group {
    position: relative;
    padding: 26rpx 50rpx 26rpx 105rpx;
    border: 1rpx solid #EA6F5A;
    border-radius: 80rpx;
    color: #EA6F5A;
    font-size: 32rpx;
  }
  &-animation {
    background-color: #EA6F5A;
    transition: all .3s;
    .like-image {
      animation: likechange 0.6s 1 steps(19);
      left: -950px;
    }
    .like-btn {
      color: #fff;
      border-right-color: #fff;
    }
    .like-count {
      color: #fff;
    }
  }
  &-icon {
    position: absolute;
    left: 15rpx;
    top: 0;
    width: 100rpx;
    height: 100rpx;
    overflow: hidden;
  }
  &-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 1000px;
    height: 50px;
  }
  &-btn {
    display: inline-block;
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1rpx solid #EA6F5A;
  }
  &-count {
    display: inline-block;
    min-width: 40rpx;
    text-align: center;
  }
}
</style>
