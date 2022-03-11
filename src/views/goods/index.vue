<template>
  <div class='xtx-goods-page' v-if="goods" >
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/'+ goods.categories[1].id ">{{ goods.categories[1].name }}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/'+ goods.categories[0].id ">{{ goods.categories[0].name }}</XtxBreadItem>
        <XtxBreadItem >{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" ></GoodsImage>
          <GoodsSales ></GoodsSales>
        </div>
        <div class="spec">
          <GoodName :goods="goods" ></GoodName>
          <GoodsSku :goods="goods" @change="changeSku" ></GoodsSku>
          <XtxNumbox v-model="num" label="数量" :max="goods.inventory" ></XtxNumbox>
          <XtxButton type="primary" style="margin-left:100px;margin-top:30px" >加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs :goods="goods" ></GoodsTabs>
          <!-- 注意事项 -->
         <GoodsWarm></GoodsWarm>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1" :goodsId="goods.id" ></GoodsHot>
          <GoodsHot :type="2" :goodsId="goods.id" ></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { provide, ref, watch } from 'vue'
import GoodsRelevant from './components/goods-relevant'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarm from './components/goods-warm.vue'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodName, GoodsSku, GoodsTabs, GoodsHot, GoodsWarm },

  setup () {
    const goods = useGoods()
    // sku改变时候触发
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    const num = ref(1)

    provide('goods', goods)

    return { goods, changeSku, num }
  }
}
// 定义一个获=获取商品详情的数据
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  // 何时发请求
  // 出现路由地址发生变化，但是不会重新初始化组件 所以监听地址路由的变化，就发起请求
  watch(() => route.params.id, (newValue) => {
    if (newValue && `/product/${newValue}` === route.path) {
      findGoods(route.params.id).then(data => {
        goods.value = data.result
        // goods.value = null
        // nextTick(() => {
        //   goods.value = data.result
        // })
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
    background-color: #fff;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
