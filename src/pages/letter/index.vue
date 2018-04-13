<template>
  <div class="letter">
    <div class="letter-box">
      <div class="letter-li">

      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'

export default {
  components: {
  },
  data () {
    return {
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
.letter {
  min-height: 100vh;
  background-color: #fff;
}
</style>
