<template>
  <div>
    <ul class="container log-list">

    </ul>
  </div>
</template>

<script>
import card from '@/components/card'
// import API from '@/api'

export default {
  components: {
    card
  },

  data () {
    return {
    }
  },
  created () {

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
