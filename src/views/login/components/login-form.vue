<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form ref="formCom" class="form" :validation-schema="schema" autocomplete="off"   v-slot="{errors}" >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field  :class="{ error:errors.account }" v-model="form.account" name="account" type="text" placeholder="请输入账户" />
          </div>
          <div class="error" v-if="errors.account" ><i class="iconfont icon-warning" />{{ errors.account }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field :class="{error:errors.password}" v-model="form.password" name="password" type="password" placeholder="请输入密码"/>
          </div>
          <div class="error" v-if="errors.password" ><i class="iconfont icon-warning" />{{errors.password}}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
             <Field  :class="{ error:errors.mobile }" v-model="form.mobile" name="mobile" type="text" placeholder="请输入账户" />
          </div>
           <div class="error" v-if="errors.mobile" ><i class="iconfont icon-warning" />{{ errors.mobile }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field :class="{error:errors.code}" v-model="form.code" name="code" type="text " placeholder="请输入验证码" />
            <span @click="send" class="code">{{time === 0?'发送验证码':`${time}后重新发送验证码`}}</span>
          </div>
          <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- <XtxCheckbox v-model="form.isAgree" /> -->
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree"/>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a @click="login"  href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <!-- <RouterLink to="/login/callback" > -->
      <!-- QQ登录按钮 -->
       <!-- <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      </RouterLink> -->
       <!-- <span id="qqLoginBtn"></span> -->
      <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
     </div>
</template>
<script>
import { onUnmounted, reactive, ref, watch } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { userAccountLogin, userMobileLoginMsg, userMobileLogin } from '@/api/user'
import store from '@/store'
import router from '@/router'
import Message from '@/components/library/Message'
import { useRoute } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
// import QC from 'qc'
// import mySchema from '@/utils/vee-validate-schema'
export default {
  name: 'LoginForm',
  components: {
    Form, Field
  },
  // 使用选项API
  // created () {
  //   this.$message({ type: 'success', text: '成功' })
  // },
  setup () {
    const route = useRoute()
    console.log('route', route)
    // 控制短信登录切换的
    const isMsgLogin = ref(false)
    // 表单对象数据
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    // 校验规则对象
    const mySchema = {
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }

    // 切换表单元素，还原数据和清除校验效果
    const formCom = ref(null)
    watch(isMsgLogin, () => {
      // 还原数据
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      // 补充校验效果清除，Form组件提供resetForm()
      formCom.value.resetForm()
    })
    const login = async () => {
      // const router = useRouter()
      const result = await formCom.value.validate()
      if (result) {
        try {
          let data = null
          if (!isMsgLogin.value) {
            debugger
            // 使用账号登录
            // const { account, password } = form
            // const { id, account, nickname, avatar, token, mobile } = await userAccountLogin(form)
            data = await userAccountLogin(form)
            // 调用store中的mutation方法存取用户信息
          } else {
            debugger
            // 使用手机号短信验证登录
            // 使用vueuse中的方法来实现
            data = await userMobileLogin(form)
          }
          debugger
          const { id, account, nickname, avatar, token, mobile } = data.result
          store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })

          // 在路由地址中取问号后的值用query

          // const route = useRoute()
          // console.log('route', route)
          // router.currentRoute.value.fullPath
          console.log(router.currentRoute.value)
          router.push(router.currentRoute.value.query.redirectUrl || '/')
          Message({ type: 'success', text: '登录成功' })
          debugger
        } catch (e) {
          // 失败提示
          console.log(e)
          Message({ type: 'error', text: '登录失败' })
        }
      }
    }
    const time = ref(1) // 定义时间
    // 定义暂停和开始函数
    const { pause, resume } = useIntervalFn(() => {
      /* your function */
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, false)
    onUnmounted(() => {
      pause()
    })
    // 发送请求
    const send = async () => {
      const valid = schema.mobile(form.mobile)
      if (valid === true) {
        debugger

        if (time.value === 0) {
          // 没有倒计时才可以
          await userMobileLoginMsg(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      } else {
        // 表单校验错误
        formCom.value.setFieldError('mobile', valid)
      }
    }
    // 组合api的拿到this的方法
    // const { proxy } = getCurrentInstance()
    // proxy.$message({ type: 'success' })
    // onMounted(() => {
    //   // 创建一个按钮，里面包含链接。去除要使用的来接。另外配置一个
    //   QC.Login({
    //     btnId: 'qqLoginBtn'
    //   })
    // })
    return { isMsgLogin, form, schema: mySchema, formCom, login, send, time }
  }

}
</script>

<style scoped lang="less" >
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          overflow: hidden;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          // width: 130px;
          height: 33px;
          padding: 0 5px;
          cursor: pointer;
        }
      }
      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
