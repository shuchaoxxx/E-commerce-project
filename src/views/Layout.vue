<template>
  <!-- <nav>顶部通栏</nav> -->
  <AppTopNavbar></AppTopNavbar>
  <!-- 头部菜单 -->
  <AppHeader></AppHeader>
  <main>
    <div class="main-box" ></div>
    <router-view></router-view>
  </main>
  <!-- 底部 -->
  <AppFooter></AppFooter>
</template>

<script>
import AppTopNavbar from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'

export default {
  components: { AppTopNavbar, AppHeader, AppFooter }

}
</script>

<style scoped lang='less' >

.main-box{
  height: 600px;
}

</style>
