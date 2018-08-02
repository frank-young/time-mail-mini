<template>
  <div class="container">
    <div class="header">
      <div class="header-wrap" @click="toLetterList">
        <image class="header-image" src="/static/images/back.png"></image>
        <span class="header-text">{{ configText.tips }}</span>
      </div>
    </div>
    <div v-if="!~~configText.audit_switch" class="letter-empty">
      {{ configText.text3 }}
    </div>
    <div v-else class="letter-wrap">
      <form @submit="submit">
        <div class="form-line-group">
          <label class="form-line-label">主题</label>
          <input class="form-line-title" :placeholder="configText.titlePlaceholder" type="text" v-model="letter.title">
        </div>
        <div class="form-line-group">
          <label class="form-line-label">邮箱</label>
          <input class="form-line-title" type="text" placeholder-style="font-size: 14px;" placeholder="请输入邮箱,信件将会发送到邮箱里" v-model="letter.email">
        </div>
        <div class="form-line-group">
          <label class="form-line-label">手机</label>
          <input class="form-line-title" type="text" placeholder-style="font-size: 14px;" placeholder="请输入手机号，用于提醒信件（严格保密）" v-model="letter.phone">
        </div>
        <div class="form-group">
          <div class="select-title">梦想内容</div>
          <textarea :maxlength="-1" v-model="letter.content" :placeholder="configText.letterPlaceholder" class="content"></textarea>
        </div>
        <div class="form-group">
          <div class="select-title">到达时间</div>
          <radio-group class="select-content" @change="arriveYearChange">
            <div class="select-left" v-if="isShowDefaultYear">
              <label class="select-label">
                <input class="select-radio" type="radio" name="arrive" :value="1" checked>
                <div class="select-radio-tips" :class="{active: arriveYear === 1}">1年</div>
              </label>
              <label class="select-label">
                <input class="select-radio" type="radio" name="arrive" :value="3">
                <div class="select-radio-tips" :class="{active: arriveYear === 3}">3年</div>
              </label>
              <label class="select-label">
                <input class="select-radio" type="radio" name="arrive" :value="5">
                <div class="select-radio-tips" :class="{active: arriveYear === 5}">5年</div>
              </label>
            </div>
            <div class="select-left" v-else>
              <picker class="select-date-show" mode="date" :value="letter.arrive_time" :start="startDate" :end="endDate" @change="arriveDateChange">
                {{ letter.arrive_time }}
              </picker>
            </div>
            <div class="select-right" v-if="isShowDefaultYear">
              <picker class="select-radio-tips" mode="date" :value="letter.arrive_time" :start="startDate" :end="endDate" @change="arriveDateChange">
                自定义
              </picker>
            </div>
            <div class="select-right" v-else>
              <div class="select-radio-tips" @click="cancelCustomerSelect">
                取消
              </div>
            </div>
          </radio-group>
        </div>
        <div class="form-group">
          <div class="select-title">信件到达后，是否公开阅读</div>
          <radio-group class="select-content" @change="isPublicChange">
            <div class="select-left">
              <label class="select-label">
                <input class="select-radio" type="radio" name="public" :value="1" checked>
                <div class="select-radio-tips" :class="{active: letter.is_public === 1}">公开</div>
              </label>
              <label class="select-label">
                <input class="select-radio" type="radio" name="public" :value="0">
                <div class="select-radio-tips" :class="{active: letter.is_public === 0}">不公开</div>
              </label>
            </div>
          </radio-group>
        </div>
        <div class="form-froup">
          <button :disabled="isDisabled" :loading="isSending" hover-class="send-hover" class="send animate-background" form-type="submit"> {{ sendText }} </button>
        </div>
      </form>
    </div>
    <toast :toast-msg.sync="toastMsg" :is-show.sync="isShow"></toast>
  </div>
</template>

<script>
import miment from 'miment'
import API from '@/api'
import Validator from 'validator.tool'
import Toast from '@/components/toast'

export default {
  data () {
    return {
      userInfo: {},
      letter: {
        title: '一封来自' + miment().format('YYYY年MM月DD日') + '的信件',
        content: '未来的自己，',
        is_public: 1,
        email: '',
        phone: '',
        arrive_time: miment().add(1, 'YYYY').format('YYYY-MM-DD')
      },
      sendText: '寄送到未来',
      // 时间选择
      arriveYear: 1,
      isShowDefaultYear: true,
      startDate: miment().add(1, 'MM').format('YYYY-MM-DD'),
      endDate: miment().add(20, 'YYYY').format('YYYY-MM-DD'),
      // 提交过程
      isSending: false,
      isDisabled: false,
      // toast
      isShow: false,
      toastMsg: ''
    }
  },
  components: {
    Toast
  },
  computed: {
    // 默认配置文字
    configText () {
      return wx.getStorageSync('configText')
    }
  },
  mounted () {
    this.userInfo = wx.getStorageSync('userInfo')
    if (typeof this.userInfo.nickname !== 'undefined') {
      this.letter.content = `未来的${this.userInfo.nickname}，`
    }
  },
  methods: {
    toLetterList () {
      wx.redirectTo({
        url: '/pages/letter/main'
      })
    },
    // 默认到达年份选择
    arriveYearChange (e) {
      this.arriveYear = Number(e.target.value)
      this.letter.arrive_time = miment().add(this.arriveYear, 'YYYY').format('YYYY-MM-DD')
    },
    // 自定义到达日期选择
    arriveDateChange (e) {
      this.isShowDefaultYear = false
      this.letter.arrive_time = e.target.value
    },
    // 取消自定义选择日期
    cancelCustomerSelect () {
      this.isShowDefaultYear = true
      this.letter.arrive_time = miment().add(1, 'YYYY').format('YYYY-MM-DD')
      this.arriveYear = 1
    },
    // 是否是公开邮件
    isPublicChange (e) {
      this.letter.is_public = Number(e.target.value)
    },
    // 提交
    async submit () {
      let res = this.validate(this.letter)
      if (!res.bool) {
        this.show(res.msg)
        return
      }

      this.letter.arrive_time = this.letter.arrive_time + miment().format(' hh:mm:ss')
      this.startSend()
      try {
        await API.sendLetter(this.letter)
        this.successSend()
      } catch (e) {
        console.log(e)
        this.failSend()
      }
    },
    // 验证
    validate (data) {
      let v = new Validator()
      let bool = false
      let msg = ''

      if (!v.required(data.title)) {
        msg = '标题不能为空'
      } else if (!v.maxLength(data.title, 100)) {
        msg = '标题长度过长'
      } else if (!v.required(data.content)) {
        msg = '内容不能为空'
      } else if (!v.minLength(data.content, 5)) {
        msg = '内容太短咯～'
      } else if (!v.isEmail(data.email)) {
        msg = '邮箱格式错误哟～'
      } else if (!v.isPhone(data.phone)) {
        msg = '手机格式错误哟～'
      } else {
        bool = true
      }
      return {
        bool,
        msg
      }
    },
    // 分离提交状态
    startSend () {
      this.isSending = true
      this.isDisabled = true
      this.sendText = '寄送中'
    },
    successSend () {
      this.isSending = false
      this.isDisabled = false
      this.letter = {
        title: '一封来自' + miment().format('YYYY年MM月DD日') + '的信件',
        content: '未来的自己，',
        is_public: 1,
        email: '',
        phone: '',
        arrive_time: miment().add(1, 'YYYY').format('YYYY-MM-DD')
      }
      this.sendText = '寄送到未来'
      wx.reLaunch({
        url: '/pages/success/main'
      })
    },
    failSend () {
      this.isSending = false
      this.isDisabled = false
      this.sendText = '寄送失败，重新寄送'
    },
    // ToastPlugin
    show (msg) {
      this.isShow = true
      this.toastMsg = msg
      setTimeout(() => {
        this.isShow = false
      }, 2000)
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

.letter-empty {
  margin: 200rpx 40rpx;
  padding: 40rpx;
  text-align: center;
  color: #666;
  font-size: 32rpx;
  border-radius: 8rpx;
  box-shadow: 0 0 8rpx #ccc;
  background-color: #fff;
}
.container {
  .tips {
    padding: 30rpx 100rpx;
    line-height: 1.7em;
    text-align: center;
    color: #fff;
    background-color: #0D45E4;
    // background: linear-gradient(180deg, #0D45E4, #3D45E4);
    font-size: 40rpx;
    letter-spacing: 8px;
  }
  .letter-wrap {
    padding: 30rpx 30rpx 40rpx 30rpx;
  }
  .form-line-group {
    padding: 16rpx 0;
    margin-bottom: 30rpx;
    font-size: 28rpx;
    display: flex;
    box-shadow: 0 0 4rpx #ccc;
    border-radius: 4rpx;
    background-color: #fff;
    .form-line-label {
      width: 100rpx;
      padding: 18rpx;
      font-size: 32rpx;
    }
    .form-line-title {
      padding: 15rpx;
      font-size: 28rpx;
      width: 100%;
    }
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
    width: 100%;
    height: 300px;
    padding: 30rpx;
    box-shadow: 0 0 4rpx #ccc;
    line-height: 1.7em;
    box-sizing: border-box;
    font-size: 14px;
    background-color: #fff;
    color: #333;
  }
  .select-title {
    color: #888;
    margin-bottom: 10rpx;
  }
  .select-content {
    position: relative;
    height: 65rpx;
    padding: 20rpx 0;
    display: flex;
    font-size: 14px;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
  .select-left {
      flex: 3;
      display: flex;
  }
  .select-right {
    position: relative;
    flex: 1;
  }
  .select-date-show {
    height: 65rpx;
    padding: 0 50rpx;
    line-height: 65rpx;
    border-radius: 65rpx;
    border: 1rpx solid #EBEBEC;
    // color: #7A7881;
    background-color: #7A7881;
    color: #fff;
  }
  .select-label {
    position: relative;
    display: block;
    flex: 1;
    .active {
      transition: all .3s;
      background-color: #7A7881;
      border-color: #7A7881;
      color: #fff;
    }
  }

  .select-radio {
    opacity: 0;
  }
  .select-radio-tips {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    height: 65rpx;
    line-height: 65rpx;
    border-radius: 65rpx;
    border: 1rpx solid #EBEBEC;
    color: #7A7881;
    text-align: center;
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
    border-radius: 40px;
    color: #fff;
    &[disabled] {
        opacity: .5;
    }
    &:after {
      display: none;
    }
  }
  .send-hover {
    background-color: #092f9c;
    &:after {
      display: none;
    }
  }
  .fixed-froup {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 15px;
    background-color: #fff;
    border-top: 1rpx solid #eee;
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
