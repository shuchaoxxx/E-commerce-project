// 请求工具需要做的事
// 1. 创建一个axios实例
// 2. 设置请求拦截器，携带请求的参数，比如token
// 3. 设置响应拦截器，对返回的数据做过滤处理，剥离无效数据，并处理token失效问题
// 4. 返回一个Promis的请求函数，包含url、method、submitDate。

import axios from 'axios'
import store from '@/store'
import router from '@/router'

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})
// 请求拦截器的设置
// 请求拦截业务逻辑
// 1.获取token，有token，在请求的头部携带上token
// 2.若请求错误，返回错误
instance.interceptors.request.use(config => {
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config // 此处必须返回config
}, err => {
  return Promise.reject(err) // 调用reject返回一个错误
})

// 响应拦截器的设置
// 响应拦截的业务逻辑
// 1.对响应的数据做过滤处理
// 2.对响应错误的处理
// 3.对token失效的处理，删除旧的token以及用户信息，跳转到登录页，跳转前使用地址栏记录之前的路由地址，以便登录后，回到原来的位置
instance.interceptors.response.use(res => res.data, err => {
  // 401（未授权） 请求要求身份验证
  if (err.response && err.response.status === 401) {
    // 失效了，要清除token和用户信息
    store.commit('user/setUser', {})
    // 要记录跳转前的地址
    // const fullPath = router.currentRoute.value.fullPath  // 注意Vue3有.value
    // fullPath需要做转码，因为地址栏遇到特殊字符有转义
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // 跳转时携带之前的路由信息
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数的封装
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // axios规定，get用params传参，method用data传参。
    // 如果method是get，用params来传递参数，
    // 如果method不是get使用data来传递参数。
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
