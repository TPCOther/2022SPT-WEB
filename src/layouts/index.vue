<template>
  <n-layout position="absolute" has-sider>
    <Sidebar/>
    <n-layout>
      <Header/>
      <Content/>
      <Footer/>
    </n-layout>
  </n-layout>
</template>

<script>
import Sidebar from './sidebar.vue'
import Footer from './footer.vue'
import Header from './header.vue'
import Content from './content.vue'
export default {
  name: 'Index',
  components: {
    Sidebar,
    Footer,
    Header,
    Content
  }
}
</script>

<style>

</style>
