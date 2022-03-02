// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item'

import defaultImg from '@/assets/images/200.png'

// require.context是webpack提供的一个自动导入的API
// 得到一个文件导入函数，传入路径，可以导入对应的文件
const importFn = require.context('./', false, /\.vue$/)
// importFn.keys()路径数组

export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)
    // 批量注册组件
    importFn.keys().forEach(key => {
      const component = importFn(key).default
      app.component(component.name, component)
    })

    defineDirective(app)
  }
}
const defineDirective = (app) => {
  app.directive('lazy', {
    mounted (el, binding) {
      // 创建观察实例
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) { // 判断是否进入了可视区
          observer.unobserve(el) // 停止对元素的观察
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      observer.observe(el) // 开启观察元素
    }
  })
}
