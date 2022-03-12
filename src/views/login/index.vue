<template>

<LoginHeader>欢迎登录</LoginHeader>
<div class="container">
<div class="login-section">
  <div class="wrapper">
    <nav>
      <a href="javascript:;" @click="activeName = 'account'"  :class="{active:activeName === 'account'}" > 账户登录 </a>
      <a href="javascript:;" @click="activeName = 'qrcode'"  :class="{active:activeName === 'qrcode'}" > 扫码登录 </a>
    </nav>
    <!-- 表单 -->
    <div class="account-box" v-if="activeName === 'account' " >
      <LoginForm></LoginForm>
    </div>

    <!-- 二维码 -->
    <div class="qrcode-box" v-if="activeName === 'qrcode' " >
      <img src="@/assets/images/qrcode.jpg" alt="">
      <p>打开<a href="JavaScript:;"> 小兔鲜 </a> 扫码登录 </p>
    </div>
  </div>
</div>
</div>
<LoginFooter></LoginFooter>

</template>

<script>
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import LoginForm from './components/login-form.vue'
import { ref } from '@vue/reactivity'
// const LoginHeader = () => import('./components/login-header.vue')
export default {
  name: 'PageLogin',
  components: { LoginHeader, LoginFooter, LoginForm },
  setup () {
    const activeName = ref('account')
    return { activeName }
  }
}
</script>

<style scoped lang="less" >
.login-section{
   background: url(../../assets/images/login-bg.png) no-repeat center / cover;
   height: 488px;
   position: relative;
   .wrapper{
     width: 380px;
     background-color: #fff;
     min-width: 380px;
     position: absolute;
     left: 50%;
     top:54px;
    //  transform: translateY(100px);
     box-shadow: 0 0 10px  rgba(0, 0, 0, 0.15);
     nav {
       height: 55px;
       border-bottom: 1px solid #f5f5f5;
       display: flex;
       padding: 0 40px;
       text-align: center;
      align-items: center;
      a{
        flex: 1;
        line-height:1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f4f5;
          // text-align: left;
        }
        &.active{
          color: @xtxColor;
          font-weight: bold;
        }
      }
     }
   }
}
// 二维码容器
.qrcode-box {
  text-align: center;
  padding-top: 40px;
  height: 332px;
  p {
    margin-top: 20px;
    a {
      color: @xtxColor;
      font-size: 16px;
    }
  }
}
</style>
