<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container" >
      <HomeBanner></HomeBanner>
     <!-- 左侧商品分类 -->
      <HomeCategory></HomeCategory>
    </div>
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner.vue'
export default {
  name: 'PageHome',
  components: {
    HomeCategory,
    HomeBanner
  }

}
</script>

<style scoped lang="less" >

</style>
