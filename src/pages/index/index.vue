<template>
  <div class="container">
    <div class="tips">
      {{ configText.tips }}
    </div>
    <div class="letter-wrap">
      <form @submit="submit">
        <div class="form-group">
          <input class="title" :placeholder="configText.titlePlaceholder" type="text" v-model="letter.title">
        </div>
        <div class="form-group">
          <textarea v-model="letter.content" :placeholder="configText.letterPlaceholder" :focus="true" class="content" email-input>1</textarea>
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
        <div class="form-group">
          <input class="title" type="text" placeholder="请输入邮箱" v-model="letter.email">
        </div>
        <div class="form-group">
          <input class="title" type="text" placeholder="请输入手机号" v-model="letter.phone">
        </div>
        <div class="form-group">
          <button :disabled="isDisabled" :loading="isSending" hover-class="send-hover" class="send animate-background" form-type="submit"> {{configText.sendText}} </button>
        </div>
      </form>
    </div>
    <toast :toast-msg.sync="toastMsg" :is-show.sync="isShow"></toast>
  </div>
</template>

<script>
import moment from 'moment'
import API from '@/api'
import Validator from 'validator.tool'
import Toast from '@/components/toast'

export default {
  data () {
    return {
      userInfo: {},
      letter: {
        title: '给2019年的自己😄',
        content: '',
        is_public: 1,
        email: '',
        phone: '',
        arrive_time: moment().add(1, 'years').format('YYYY-MM-DD')
      },
      // 默认配置文字
      configText: {
        tips: '写给未来自己的一封信',
        titlePlaceholder: '标题',
        letterPlaceholder: '一年后，我们一起见证奇迹！',
        sendText: '寄送到未来'
      },
      // 时间选择
      arriveYear: 1,
      isShowDefaultYear: true,
      startDate: moment().add(10, 'days').format('YYYY-MM-DD'),
      endDate: moment().add(20, 'years').format('YYYY-MM-DD'),
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
  },
  methods: {
    // 默认到达年份选择
    arriveYearChange (e) {
      this.arriveYear = Number(e.target.value)
      this.letter.arrive_time = moment().add(this.arriveYear, 'years').format('YYYY-MM-DD')
    },
    // 自定义到达日期选择
    arriveDateChange (e) {
      this.isShowDefaultYear = false
      this.letter.arrive_time = e.target.value
    },
    // 取消自定义选择日期
    cancelCustomerSelect () {
      this.isShowDefaultYear = true
      this.letter.arrive_time = moment().add(1, 'years').format('YYYY-MM-DD')
      this.arriveYear = 1
    },
    // 是否是公开邮件
    isPublicChange (e) {
      this.letter.is_public = Number(e.target.value)
    },
    // 提交
    submit () {
      let res = this.validate(this.letter)
      if (!res.bool) {
        this.show(res.msg)
        return
      }

      this.startSend()
      API.sendLetter(this.letter)
      .then(res => {
        this.successSend()
      })
      .catch(() => {
        this.failSend()
      })
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
      this.configText.sendText = '寄送中'
    },
    successSend () {
      this.isSending = false
      this.isDisabled = true
      this.configText.sendText = '寄送成功'
      wx.reLaunch({
        url: '/pages/success/main'
      })
    },
    failSend () {
      this.isSending = false
      this.isDisabled = false
      this.configText.sendText = '寄送失败，重新寄送'
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
  created () {
    this.userInfo = wx.getStorageSync('userInfo')
  }
}
</script>

<style scoped lang="less">
.container {
  background-color: #fff;
  .tips {
    padding: 30rpx 100rpx;
    line-height: 1.7em;
    text-align: center;
    color: #fff;
    background-color: #0D45E4;
    // background: linear-gradient(180deg, #0D45E4, #3D45E4);
    font-size: 40rpx;
  }
  .letter-wrap {
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
      background-color: #7A7881;
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
