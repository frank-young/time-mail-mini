<template>
  <div class="container">
    <div class="tips">
      {{ configText.tips }}
    </div>
    <div class="email-wrap">
      <form @submit="submit">
        <div class="form-group">
          <input class="title" type="text" :value="post.title">
        </div>
        <div class="form-group">
          <textarea :placeholder="configText.emailPlaceholder" :focus="true" class="content" email-input>1</textarea>
        </div>
        <div class="form-group">
          <div class="select-title">到达时间</div>
          <radio-group class="select-content" @change="arriveChange">
            <label class="select-label">
              <input class="select-radio" type="radio" name="arrive" value="1"><div class="select-radio-tips">1年</div>
            </label>
            <label class="">
              <input class="select-radio" type="radio" name="arrive" value="2"><div class="select-radio-tips">2年</div>
            </label>
          </radio-group>
        </div>
        <div class="form-group">
          <div class="select-title">信件到达后，是否公开阅读</div>
          <div class="">
            dd
          </div>
        </div>
        <div class="form-group">
          <button hover-class="send-hover" class="send animate-background" form-type="submit"> {{configText.sendText}} </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      userInfo: {},
      post: {
        title: '给2019年的自己😄'
      },
      configText: {
        tips: '写给未来自己的一封信',
        emailPlaceholder: '写一些内容给未来的自己',
        sendText: '寄送到未来'
      }
    }
  },
  computed: {

  },
  components: {
    card
  },
  methods: {
    arriveChange (event) {
      console.log(event.target.value)
    },
    submit () {
      console.log('==')
    }
  },
  created () {
    this.userInfo = wx.getStorageSync('userInfo')
  }
}
</script>

<style scoped lang="less">
.container {
  .tips {
    padding: 30rpx 100rpx;
    line-height: 1.7em;
    text-align: center;
    color: #fff;
    background-color: #0D45E4;
    // background: linear-gradient(180deg, #0D45E4, #3D45E4);
    font-size: 40rpx;
  }
  .email-wrap {
    padding: 30rpx 40rpx;
  }
  .form-group {
    margin-bottom: 30rpx;
    font-size: 28rpx;
  }
  .title {
    padding: 15rpx;
    border-bottom: 1rpx solid #ccc;
    font-size: 32rpx;
  }
  .content {
    border: 1rpx solid #ccc;
    width: 100%;
    height: 300px;
    padding: 30rpx;
    line-height: 1.7em;
    box-sizing: border-box;
    font-size: 16px;
  }
  .select-title {
    color: #888;
  }
  .select-content {
    position: relative;
    padding: 20rpx;
  }
  .select-label {
    display: block;
    width: 200rpx;
    float: left;
  }
  .select-radio {

  }
  .select-radio-tips {

  }
  .send {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 32rpx;
    font-weight: 400;
    border-radius: 0;
    letter-spacing: 5rpx;
    background-color: #0D45E4;
    border-color: transparent;
    color: #fff;
    &[disabled] {
        opacity: .5;
    }
  }
  .send-hover {
    background-color: #092f9c;
  }
}
.animate-background {
  background: linear-gradient(241deg, #FF8C47, #0D45E4, #22E099, #FF5D36);
  background-size: 800%, 800%;
  animation: rainbow 8s ease infinite;
}
@keyframes rainbow {
  0%{
    background-position:0% 80%;
  }
  50%{
    background-position:100% 20%;
  }
  100%{
    background-position:0% 80%;
  }
}
</style>
