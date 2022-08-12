import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./mock/index";
import naive from "@/plugins/naiveUI" // 按需全局导入naive UI组件

createApp(App).use(router).use(naive).mount("#app");
