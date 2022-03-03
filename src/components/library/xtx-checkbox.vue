<template>
  <div class="xtx-checkbox" @click="changeChecked()" >
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
// import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },

  // 不使用@vueuse/core的useVModel方法
  // setup (props, { emit }) {
  //   const checked = ref(false)
  //   const changeChecked = () => {
  //     checked.value = !checked.value
  //     emit('update:modelValue', checked.value)
  //   }
  //   // 使用侦听器，得到父组件传递数据，给checked数据
  //   watch(() => props.modelValue, () => {
  //     checked.value = props.modelValue
  //   }, { immediate: true })

  // 使用@vueuse/core的方法封装
  setup (props, { emit }) {
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newValue = !checked.value
      checked.value = newValue
      // 让组件支持change事件
      emit('change', newValue)
    }
    return { checked, changeChecked }
  }

}
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
