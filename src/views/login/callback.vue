<template>
<LoginHeader>联合登录</LoginHeader>
<div class="section">
  <div class="container">
    <!-- tab栏 -->
    <nav class="tab" >
      <a href="javascript:;" @click="hasAccount =true" :class="{active:hasAccount === true}" >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a href="javascript:;"  @click="hasAccount = false" :class="{active:hasAccount === false}"  >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
     <!-- tan页的内容区 -->
  <div class="tab-content" v-if="hasAccount" >
  <CallbackBind :unionId="unionId" ></CallbackBind>
  </div>
  <div class="tab-content" v-else >
  <CallbackPatch></CallbackPatch>
  </div>
  </div>
</div>
<LoginFooter></LoginFooter>
 <div class="container" v-if="isBind">
   <div class="unbind">
     <div class="loading"></div>
   </div>
 </div >
</template>

<script>
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
import QC from 'qc'
import { ref } from '@vue/reactivity'
import { userQQLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Message from '@/components/library/Message'
export default {
  name: 'LoginCallback',
  components: { LoginHeader, LoginFooter, CallbackBind, CallbackPatch },
  setup () {
    const store = useStore()
    const router = useRouter()
    const hasAccount = ref(true)
    // 控制loading的显示与隐藏
    const isBind = ref(true)
    const unionId = ref(null)
    //
    // console.log('QC.Login.check()', QC.Login.check())
    // console.log('QC.Login.check()', QC.Login.getMe((od) => {
    //   console.log('od', od)
    // }))
    debugger
    if (QC.Login.check()) {
      debugger
      // 检查QQ是否登录 需要在QQ登录的情况来才能获取 openId
      QC.Login.getMe((openId) => {
        unionId.value = openId
        userQQLogin(openId).then(data => {
          // 进入，使用QQ登录成功
          // 1.存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          // 2. 跳转到来源页或者首页
          router.push(store.state.user.redirectUrl)
          // 3. 成功提示
          Message({ type: 'success', text: 'QQ登录成功' })
        }).catch(e => {
          isBind.value = false
        })
      })
    }
    return { hasAccount, isBind, unionId }
  }

}
</script>

<style scoped lang="less" >
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
</style>
