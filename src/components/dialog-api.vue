<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import { useDialog } from 'naive-ui'
export default defineComponent({
  name: 'MessageApi',
  setup () {
    window.$dialog = useDialog()
  }
})
</script>

<style>

</style>
