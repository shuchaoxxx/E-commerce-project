// s实现使用函数调用消息提示组件
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

// 准备DOM容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

// 导出一个方法，调用消息组件就调用此方法
export default ({ type, text }) => {
  // 根据已经创建好的组件，生成虚拟的DOM节点对象
  const vnode = createVNode(XtxMessage, { type, text })
  // vender 把虚拟的DOM节点对象，渲染在一个容器中
  render(vnode, div)
  // 创建一个定义器
  let timer = null
  // 每次初始化定时器时，注意先清除定时器，防止重复使用，占用内存
  clearTimeout(timer)
  timer = setTimeout(() => { render(null, div) }, 3000)
}
