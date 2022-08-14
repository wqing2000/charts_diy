<template>
  <div ref="lineChart" id="lineChart"></div>
</template>

<script>
import { defineComponent, ref, onMounted, watch, computed, inject } from 'vue'
import echarts from "@/plugins/echarts";

export default defineComponent({
  name: "LineChart",
  setup(props, { emit }) {

    const optionData = inject('optionData')
    let lineChart = ref()
    let myChart = null; // echart

    onMounted(() => {
      myChart = echarts.init(lineChart.value);
    })

    function renderChart() {
      myChart.setOption(optionData.value);
    }

    watch(
      optionData,
      (newValue, oldValue) => {
        newValue && renderChart();
      },
      { deep: true }
    )

    return {
      lineChart,
    }
  }
})
</script>

<style scoped>
#lineChart {
  height: 400px;
  /* margin-top: 50px; */
}
</style>