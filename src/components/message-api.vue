<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
export default defineComponent({
  name: 'MessageApi',
  setup () {
    window.$message = useMessage()
  }
})
</script>

<style>

</style>
