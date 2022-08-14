<template>
  <n-form :model="model">
    <n-form-item label="线条颜色" path="color" :rule="colorRule">
      <n-color-picker v-model:value="model.color" :actions="['confirm']" @confirm="onChangeColor(model.color)"
        :show-alpha="false" width="50" />
    </n-form-item>
  </n-form>
</template>

<script >
import { defineComponent, reactive, onMounted } from 'vue'

// 模拟数据，可以提取到单独文件
const defaultOption = {
  title: {
    text: "折线图",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
      itemStyle: {
        color: "#0051FF",
      },
    },
  ],
};

export default defineComponent({
  setup(props, { emit }) {
    const optionData = reactive(defaultOption)
    const model = reactive({
      color: '#0051FF'
    })

    onMounted(() => {
      emit("onChangeOption", optionData);
      const { series } = optionData;
      model.color = series[0].itemStyle.color;
    })

    const onChangeColor = (color) => {
      optionData.series = optionData.series.map((item) => {
        return {
          ...item,
          itemStyle: {
            color,
          },
        };
      });
    }

    return {
      onChangeColor,
      model,
      colorRule: {
        trigger: 'change',
        validator(_, value) { }
      }
    }
  }
})
</script>

<style scoped>
</style>