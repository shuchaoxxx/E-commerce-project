<template>
  <div class="xtx-city" ref="target" >
    <div class="select" @click="toggle"  :class="{active:active}" >
      <span v-if="!placeholder" class="placeholder" >{{ placeholder }}</span>
      <div v-else class="value"> {{ fullLocation }} </div>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active"   >
      <div class="loading" v-if="loading" ></div>
      <template v-else >
        <span class="ellipsis" @click='changeItem(item)'  v-for="item in currList" :key="item.code" > {{item.name}}  </span>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, ref, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    },
    placeholder: {
      tyoe: String,
      default: '请选择配送地址'
    }
  },
  setup (props, { emit }) {
    const active = ref(false)
    const cityData = ref({})
    const loading = ref(false)
    const open = () => {
      active.value = true
      loading.value = true
      getCityData().then(data => {
        cityData.value = data
        loading.value = false
      })

      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const close = () => {
      active.value = false
    }
    const toggle = () => {
      active.value ? close() : open()
    }
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })

    // 定义需要使用的计算属性 利用计算属性的特点来通过点击来获取省、市、地区的值
    const currList = computed(() => {
      // 省份
      let currList = cityData.value
      // 城市
      if (changeResult.provinceCode) {
        currList = currList.find(item => item.code === changeResult.provinceCode).areaList
      }
      // 地区
      if (changeResult.cityCode) {
        currList = currList.find(i => i.code === changeResult.cityCode).areaList
      }

      return currList
    })
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    const changeItem = (item) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 地区
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        close()
        emit('change', changeResult)
      }
    }

    return { active, toggle, target, loading, currList, changeItem }
  }

}
// 获取城市数据
// 1、接口 ？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 2、何时获取？打开城市列表的时候，做个内存缓存
// 3、怎么使用数据，定义计算属性，根据点击的省份城市来展示
const getCityData = () => {
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 有缓存直接使用缓存
      resolve(window.cityData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then((res) => {
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  display: flex;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      //  transform: translateY(-100px);
      float: left;
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
