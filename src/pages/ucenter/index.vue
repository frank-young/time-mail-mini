<template>
  <div>
    <ul class="container log-list">
      <li v-for="e in emails" :key="e.id" class="log-item">
        {{ e.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import card from '@/components/card'
import API from '@/api'

export default {
  components: {
    card
  },

  data () {
    return {
      emails: []
    }
  },
  created () {
    API.getPublicLetters()
    .then(res => {
      this.emails = res.data.data
    })
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
