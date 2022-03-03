<template>
   <div class="sub-filter" v-if="filterData" >
     <div class="item">
       <div class="head">品牌:</div>
       <div class="body">
         <!-- <a @click=" filterData.selectedBrand = brand.id " :class="{active: filterData.selectedBrand ===brand.id }" href="javascript:;" v-for="brand in filterData.brands" :key="brand">{{brand.name}}</a> -->
         <a @click=" changeBrand(brand.id) " :class="{active: filterData.selectedBrand ===brand.id }" href="javascript:;" v-for="brand in filterData.brands" :key="brand">{{brand.name}}</a>
       </div>
     </div>
     <div class="item" v-for="p in filterData.saleProperties" :key="p.id" >
       <div class="head"> {{p.name}} </div>
        <div class="body">
         <!-- <a  @click="p.selectedProp = attr.id " :class="{active:p.selectedProp === attr.id}" href="javasript:;" v-for="attr in p.properties" :key="attr.id">{{attr.name}}</a> -->
         <a  @click="changeAttr(p,attr.id) " :class="{active:p.selectedProp === attr.id}" href="javasript:;" v-for="attr in p.properties" :key="attr.id">{{attr.name}}</a>
        </div>
     </div>
   </div>
    <div v-else class="sub-filter">
      <XtxSkeleton class="item" width="800px" height="40px"  />
      <XtxSkeleton class="item" width="800px" height="40px"  />
      <XtxSkeleton class="item" width="600px" height="40px"  />
      <XtxSkeleton class="item" width="600px" height="40px"  />
      <XtxSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'

export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const filterData = ref(null)
    // filterData的数据结构如下
    // filterData = {
    //   selectedBrand: null,
    //   brands: [{ id: null, name: '全部' }, { id: 32423, name: 'huawei' }, { id: 3243243, name: '苹果' }],
    //   saleProperties: [
    //     { selectedProp: null, properties: [{ id: null, name: '全部' }, { id: 1111, name: '红色' }] },
    //     { selectedProp: null, properties: [{ id: null, name: '全部' }, { id: 2222, name: '蓝色' }] }
    //   ]
    // }
    const route = useRoute()
    watch(() => route.params.id, (newValue) => {
      // 判断何时去请求数据
      if (newValue && `/category/sub/${newValue}` === route.path) {
        findSubCategoryFilter(route.params.id).then(data => {
          // 给品牌添加两个属性
          data.result.selectedBrand = null
          data.result.brands.unshift({ id: null, name: '全部' })
          // 给销售添加两个属性
          data.result.saleProperties.forEach(p => {
            p.selectedProp = null
            p.properties.unshift({ id: null, name: '全部' })
          })
          filterData.value = data.result
        })
      }
    }, { immediate: true })

    // 选择品牌
    const changeBrand = (id) => {
      if (filterData.value.selectedBrand === id) return
      filterData.value.selectedBrand = id
      emit('filter-change', getFilterParams)
    }
    // 选择分类属性
    const changeAttr = (p, attrId) => {
      if (p.selectedProp === attrId) return
      p.selectedProp = attrId
      emit('filter-change', getFilterParams)
    }
    // 获取筛选参数
    // 后台需要的数据结构
    // filterParams = {
    //   brandId: 111111,
    //   attrs: [
    //     { groupName: '颜色', propertyName: '黑色' },
    //     { groupName: '大小', propertyName: '五寸' }
    //   ]
    // }

    const getFilterParams = () => {
      const filterParams = {}
      const attrs = []
      filterParams.brandId = filterData.value.selectedBrand
      filterData.value.saleProperties.forEach((item) => {
        const attr = item.properties.find(i => i.id === item.selectedProp)
        if (attr && attr !== undefined) {
          attrs.push({ groupName: item.name, propertyName: attr.name })
        }
      })
      if (attrs.length) filterParams.attrs = attrs
      return filterParams
    }

    return { filterData, changeBrand, changeAttr }
  }
}
</script>
<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
    .xtx-skeleton {
      padding: 10px 0;
    }
</style>
