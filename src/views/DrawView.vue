<template>
  <n-layout has-sider class="chartsHome">
    <!-- 拖拽页面基础布局 -->
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="120" :width="240" show-trigger="arrow-circle">
      <n-layout-header bordered>
        组件库
      </n-layout-header>
      <DragCpns :templateList="tempList"></DragCpns>
    </n-layout-sider>
    <n-layout has-sider sider-placement="right">
      <n-layout bordered>
        <n-layout-header bordered>
          画布
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <ShowChart @onChangeConfig="onChangeConfig" @onClearConfig="onClearConfig"></ShowChart>
        </n-layout-content>
      </n-layout>
      <n-layout-sider bordered collapse-mode="width" :collapsed-width="120" :width="240" show-trigger="arrow-circle">
        <n-layout-header bordered>
          属性配置
        </n-layout-header>
        <div class="config-wrap">
          <component v-if="configCom" :is="configCom" @onChangeOption="onChangeOption"></component>
        </div>
      </n-layout-sider>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import templateList from '@/constant/comtemplate';
import configMap from '@/constant/configMap';
import { defineComponent, reactive, ref, markRaw, provide, readonly } from 'vue'
import DragCpns from './DrawView/DragCpns.vue';
import ShowChart from './DrawView/ShowChart.vue'

export default defineComponent({
  setup() {
    let tempList = reactive(templateList) // 组件库列表
    let configCom = ref(null) // 右边栏应该显示的属性配置组件
    let option = ref(null) // 存储当前画布echart图表的配置数据
    provide('optionData', readonly(option))

    const onChangeOption = (data: any) => {
      option.value = data; // 使用ref，避免reative对象直接赋值失去响应式
    }

    const onChangeConfig = (key: any) => {
      if (!key) {
        configCom.value = null;
        return;
      }
      configCom.value = markRaw(configMap[key]);
    }

    const onClearConfig = () => {
      option.value = null;
      configCom.value = null;
    }

    return {
      tempList,
      option,
      configCom,
      onChangeConfig,
      onChangeOption,
      onClearConfig
    };
  },
  components: { DragCpns, ShowChart }
})
</script>

<style lang="scss" scoped>
.chartsHome {
  height: 100%;

  .n-layout-header {
    padding: 24px;
    background-color: $color-background;
    color: $color-text-ll;
    font-weight: bold;
  }

  .config-wrap {
    padding: 10px;
  }
}
</style>