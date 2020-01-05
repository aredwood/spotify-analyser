<template>
  <div class="home">
    <Auth/>
  </div>
</template>

<script>
// @ is an alias to /src
import Auth from '@/components/Auth.vue'

export default {
  name: 'home',
  components: {
    Auth
  }
}
</script>
