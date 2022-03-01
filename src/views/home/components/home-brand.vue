<template>
  <HomePanel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a @click="toggle(-1)" :class="{disabled:index === 0}" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="toggle(1)" :class="{ disabled:index === 1 }" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>

      <div class="box" ref="target">
        <Transition name="fade"  >
          <ul v-if="goods.length" class="list"  :style="{transform:`translateX(${-index*1240}px)`}" >
          <li v-for="i in goods" :key="i.id">
            <RouterLink to="/">
              <img v-lazy="i.picture" alt="">
            </RouterLink>
          </li>
          </ul>
          <div v-else  class="skeleton">
            <XtxSkeleton v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"  ></XtxSkeleton>
          </div>
        </Transition>
      </div>

  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import { findBrand } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    const index = ref(0)
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }
    // const goods = ref([])
    // findBrand(10).then((data) => {
    //   goods.value = data.result
    // })
    // 此处需要传递参数 可以以函数的方式参入入参，
    const { target, result } = useLazyData(() => findBrand(10))
    return { toggle, index, goods: result, target }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
  .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
