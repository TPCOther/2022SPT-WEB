<template>
  <n-message-provider>
    <MessageApi />
  </n-message-provider>
  <n-dialog-provider>
    <DialogApi />
  </n-dialog-provider>
  <router-view/>
</template>

<script>
import MessageApi from './components/message-api.vue'
import DialogApi from './components/dialog-api.vue'
export default {
  components: { MessageApi, DialogApi }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
