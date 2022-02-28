import XtxSkeleton from './xtx-skeleton.vue'

export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties
    app.component(XtxSkeleton.name, XtxSkeleton)
  }
}
