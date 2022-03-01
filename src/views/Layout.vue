<template>
  <!-- <nav>顶部通栏</nav> -->
  <AppTopNavbar></AppTopNavbar>
  <!-- 头部菜单 -->
  <AppHeader></AppHeader>
  <!-- 头部吸顶组件 -->
  <AppHeaderSticky></AppHeaderSticky>
  <!-- 主体内容部分 -->

    <!-- 二级路由 -->
    <RouterView></RouterView>

  <!-- 底部 -->
  <AppFooter></AppFooter>
</template>

<script>
import AppTopNavbar from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'

export default {
  name: 'Layout',
  components: { AppTopNavbar, AppHeader, AppFooter, AppHeaderSticky },
  setup () {
    // 调用接口，获取头部分类数据
    const store = useStore()
    store.dispatch('category/getList')
  }

}
</script>

<style scoped lang='less' >

</style>
