<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- footer组件在Home和Search中显示，Login和Register隐藏 -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知 vuex 发送请求，获取数据，存储到仓库中
    this.$store.dispatch('home/getCategoryList')
  },
}
</script>

<style></style>
