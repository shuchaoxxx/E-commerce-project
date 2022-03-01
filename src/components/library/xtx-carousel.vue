<template>
<div class="xtx-carousel" @mouseenter="stop()"  @mouseleave="start()" >
  <!-- 主体图片 -->
  <ul class="carousel-body" >
    <li class="carousel-item"  v-for="(item,i) in sliders" :key="i" :class="{fade:index === i}" >
      <RouterLink to="/" >
        <img :src="item.imgUrl" alt="">
      </RouterLink>
    </li>
  </ul>
  <!-- 上一张与下一张的按钮 -->
 <a @click="toggle(-1)"  href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
 <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
 <!-- 指示点 -->
  <div class="carousel-indicator">
    <span @click="index = i" v-for="(item,i) in sliders" :key="i" :class="{active:index === i}" ></span>
  </div>
</div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 传递进来的图片数组
    sliders: {
      type: Array,
      default: () => []
    },
    // 自动播放下一张图片的时长
    duration: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },

  // 轮播图逻辑
  setup (props) {
    // 默认显示图片的索引 定义一个变量，来记录当前图片的显示 配合属性来控制
    const index = ref(0)
    // 自定义一个无限循环播放器
    let timer = null
    // 自定义一个自动播放的函数
    const autoPlayFn = () => {
      // 先重置再赋值
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value > props.sliders.length - 1) {
          index.value = 0
        }
      }, props.duration)
    }
    // 定义触发自动播放的时刻
    watch(() => props.sliders, (newValue) => {
      // 有数据且开启了自动播放，才调用自动播放函数
      if (newValue.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    }, { immediate: true })

    // 鼠标经过和离开时，设置暂定和开始
    // 定义暂停函数
    const stop = () => {
      if (timer) {
        clearInterval(timer)
      }
    }
    // 定义开始函数
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }

    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex >= props.sliders.length) {
        index.value = 0
        return
      }
      if (newIndex < 0) {
        index.value = props.sliders.length - 1
        return
      }
      index.value = newIndex
    }
    // 组件销毁，清理定时器, 缓解内存
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { index, stop, start, toggle }
  }
}
</script>

<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
