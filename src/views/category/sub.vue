<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区域 -->
      <SubFilter @filter-change="changeFilter" ></SubFilter>
      <!-- 商品·展示区域 -->
      <div class="goods-list">
        <!-- 商品排序方式 -->
        <SubSort @change-sort="changeSort"  :chang-sort="getData" ></SubSort>
        <!-- 商品展示 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id" >
            <GoodsItem :goods='item' ></GoodsItem>
          </li>
        </ul>
          <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" > </XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'

export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const route = useRoute()
    const loading = ref(false)
    const goodsList = ref([])
    let reqParams = {
      page: 1,
      pagesize: 20,
      categoryId: route.params.id
    }
    const finished = ref(false)
    // 获取数据函数
    const getData = () => {
      loading.value = true
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          // 加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }

    // 切换二级类目重新加载
    watch(() => route.params.id, (newValue) => {
      if (newValue && route.path === `/category/sub/${newValue}`) {
        goodsList.value = []
        reqParams.value = {
          page: 1,
          pagesize: 20
        }
        finished.value = false
      }
    })

    // 监听筛选区域改变
    const changeFilter = (filterParams) => {
      goodsList.value = [] // 清空后，无限加载器会在可视区，就会去发送请求
      reqParams = { ...reqParams, ...filterParams } // 改变请求的参数
      reqParams.page = 1 // 每次重新请求必须时重新在第一页开始
      finished.value = false // 每次请求必须改变finished为false
    }
    // 监听排序改变
    const changeSort = (sortParmas) => {
      goodsList.value = [] // 清空后，无限加载器会在可视区，就会去发送请求
      reqParams = { ...reqParams, ...sortParmas } // 改变请求的参数
      reqParams.page = 1 // 每次重新请求必须时重新在第一页开始
      finished.value = false // 每次请求必须改变finished为false
    }

    return { getData, loading, finished, goodsList, changeFilter, changeSort }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
