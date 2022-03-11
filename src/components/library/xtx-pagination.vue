<template>
  <div class="xtx-pagination">
    <a href="javascript:;" v-if="myCurrentPage<=1"  class="disabled">上一页</a>
    <a href="javascript:;" @click="changePage( myCurrentPage-1 )" v-else >上一页</a>
    <span v-if="pager.start>1" >...</span>
    <a href="javascript:;" @click="changePage( i )" :class="{active:i === myCurrentPage}" v-for="i in pager.btnArr" :key="i" >{{ i }}</a>
    <span v-if="pager.end<pager.pageCount" >...</span>
    <a v-if="myCurrentPage>=pager.pageCount" href="javascript:;" class="disabled" >下一页</a>
    <a v-else @click="changePage( myCurrentPage+1 )" href="javascript:;">下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
export default {
  props: {
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  name: 'XtxPagination',

  setup (props, { emit }) {
    // 先定义四个需要主动定义的数据 显示按钮数、总条数、每页显示条数、当前第几页
    // 总页数
    const myTotal = ref(100)
    // 每页显示条数
    const myPagesize = ref(10)
    // 当前第几页
    const myCurrentPage = ref(1)
    // 显示按钮个数
    const btnCount = 5

    // 根据以上数据计算出  总页数、起始按钮、结束按钮、按钮数组
    // 总页数
    const pager = computed(() => {
      // 计算总页数
      const pageCount = Math.ceil(myTotal.value / myPagesize.value)
      // 计算起始页码和结束页码
      let start = myCurrentPage.value - Math.floor(btnCount / 2)
      let end = start + btnCount - 1
      if (end > pageCount) {
        end = pageCount
        start = (end - btnCount + 1) < 1 ? 1 : (end - btnCount + 1)
      }
      if (start < 1) {
        start = 1
        end = (start + btnCount - 1) > pageCount ? pageCount : (start + btnCount - 1)
      }
      // 由start和end得到按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      return { pageCount, start, end, btnArr }
    })

    // 监听传人的值改变
    watch(props, () => {
      myTotal.value = props.total
      myPagesize.value = props.pageSize
      myCurrentPage.value = props.currentPage
    }, { immediate: true })

    // 改变页码
    const changePage = (newPage) => {
      if (myCurrentPage.value !== newPage) {
        myCurrentPage.value = newPage
        // 通知父组件最新页码
        emit('current-change', newPage)
      }
    }

    return { pager, myCurrentPage, changePage }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
