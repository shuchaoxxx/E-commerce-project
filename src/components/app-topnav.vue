<template>
  <nav class="app-topnav" >
    <div class="container">
      <ul>
       <template v-if="profile.token" >
        <li><a href="javascript:;"> <i class="iconfont icon-user" ></i> {{ profile.account }}</a></li>
        <li><a href="JavaScript:;" @click="logout" >退出登录</a></li>
       </template>
       <template v-else >
        <li><RouterLink href="JavaScript:;" to="/login" >请先登录</RouterLink></li>
        <li><a href="JavaScript:;">免费注册</a></li>
       </template>
        <li><a href="JavaScript:;">我的订单</a></li>
        <li><a href="JavaScript:;">会员中心</a></li>
        <li><a href="JavaScript:;">帮助中心</a></li>
        <li><a href="JavaScript:;">关于我们</a></li>
        <li><a href="JavaScript:;"><i class="iconfont icon-phone" ></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

// import { useRouter } from 'vue-router'
import router from '@/router'

export default {
  name: 'AppTopnav',
  setup () {
    const store = useStore()
    // 直接结构vuex  中的数据使用，不是响应式，需要设置成计算属性
    const profile = computed(() => {
      return store.state.user.profile
    })
    const logout = () => {
      store.commit('user/logout')
      router.push('/login')
    }
    return { profile, logout }
  }
}
</script>

<style scoped lang="less" >
.app-topnav{
  background: #333;
  ul{
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
  }
  li{
    a{
      padding: 0 15px;
      color: #cdcdcd;
      line-height: 1;
      display: inline-block;
      i {
        font-size: 14px;
        margin-right: 2px;
      }
      &:hover{
        color:@xtxColor;
      }
    }
    ~ li {
      a {
        border-left: 2px solid #666;
      }
    }
  }
}
</style>
