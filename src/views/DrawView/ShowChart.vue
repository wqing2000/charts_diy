<template>
  <div>
    <div :class="style" @drop="drop" @dragover.prevent>
      <p v-show="!isShow">{{ text }}</p>
      <component :is="text.component"></component>
    </div>
    <div v-show="isShow" class="detale-cpn">
      <a href="javascript:;" @click="detaleDrag">取消</a>
    </div>
  </div>
</template>

<script lang="ts">
import componentMap from "@/constant/componentMap";
import { defineComponent, ref, markRaw } from 'vue'

export default defineComponent({
  name: "ShowChart",
  setup(props, { emit }) {
    let style = ref("show-cpn");
    let text = ref("展示组件");
    let isShow = ref(false);

    let drop = function (event: any) {
      //此处返回的是drop事件源，也就是说不通过额外的信息传递是无法找到源本拖拽的组件
      const curInfo = JSON.parse(event.dataTransfer.getData("drag-info"));
      curInfo.component = markRaw(componentMap[curInfo.comKey]);
      text.value = curInfo;
      style.value = "drag-cpn";
      isShow.value = true;

      emit("onChangeConfig", curInfo.configKey); // 匹配图表对应属性配置组件
    };

    let detaleDrag = function () {
      text.value = "展示组件";
      style.value = "show-cpn";
      isShow.value = false;

      emit("onClearConfig");
    };

    return {
      drop,
      text,
      style,
      ...props,
      isShow,
      detaleDrag,
    };
  }
})
</script>

<style lang="scss" scoped>
.show-cpn {
  width: calc(100% - 40px);
  height: 380px;
  background-color: #fff;
  margin-top: 30px;
  text-align: center;
  user-select: none;
  border: rgb(0, 0, 0) 0.8px dashed;
  opacity: 0.7;
  padding: 0 10px;
  margin-left: 10px;

  p {
    line-height: 10px;
    padding-top: 40px;
  }
}

/* 替换后样式 , 可以抽离在通用css样式中*/
.drag-cpn {
  width: 400px;
  background-color: #fff;
  margin: 0 auto;
  text-align: center;
  cursor: move;
  user-select: none;

  p {
    line-height: 10px;
    padding-top: 40px;
  }
}

.detale-cpn {
  position: relative;

  a {
    position: absolute;
    right: 50px;
    top: -50px;
  }
}
</style>