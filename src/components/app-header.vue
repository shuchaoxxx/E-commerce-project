<template>
<header class="app-header" >
<div class="container">
  <h1 class="logo"> <router-link to='/'>  小兔鲜 </router-link></h1>
  <AppHeaderNav></AppHeaderNav>
  <div class="search">
    <i class="iconfont icon-search" ></i>
    <input type="text" placeholder="搜一搜" >
  </div>
   <!-- 购物车 -->
  <AppHeaderCart></AppHeaderCart>
</div>
  </header>
</template>

<script>
import AppHeaderNav from './app-header-nav.vue'
import AppHeaderCart from './app-header-cart.vue'
export default {
  name: 'AppHeader',
  components: {
    AppHeaderNav, AppHeaderCart
  }

}
</script>

<style scoped lang="less" >
.app-header{
  background:#fff;
  .container{
    display: flex;
    align-items:center;
  }
  .logo{
    width: 200px;
    a{
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../assets/images/logo.png) no-repeat center 18px/contain ;
    }
  }
  .navs {
    width: 820px;
    display: flex;
    justify-content: space-between;
    padding-left: 40px;
    li{
      margin-right: 40px;
      width: 38px;
      text-align: center;
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover{
        a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
      }
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    display: flex;
    .icon-search {
      font-size: 18px;
      margin:0 10px 0 5px;
      color: #666;
    }
  }
}

</style>
