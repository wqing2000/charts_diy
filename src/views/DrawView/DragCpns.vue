<template>
  <div>
    <div v-for="(item, index) in cpnNames" :key="index">
      <!-- 用于循环生成所有组件列表 -->
      <div class="drag-cpn" draggable="true" @dragstart="dragStart($event, item)" @dragend="dragEnd($event)">
        <div class="template-item">
          <img :src="item.thumbnail" alt="" width="80" height="60">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: "DragCpns",
  props: {
    templateList: {
      type: Array
    }
  },
  setup(props) {

    let cpnNames = computed(() => {
      return props.templateList
    });

    let dragStart = function (event: any, item: any) {
      event.dataTransfer.setData("drag-info", JSON.stringify(item));
    };

    let dragEnd = function (event: any) {
      event.dataTransfer.clearData();
    };

    return {
      cpnNames,
      dragStart,
      dragEnd
    }
  }
})
</script>

<style lang="scss" scoped>
.drag-cpn {
  width: calc(100% - 20px);
  height: 80px;
  margin: 10px;

  .template-item {
    width: 80px;
    margin: 0 auto;
    border: 1px solid $color-theme-d;

    p {
      background-color: $color-theme-d;
    }
  }
}
</style>