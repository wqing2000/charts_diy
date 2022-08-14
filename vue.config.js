const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量
        additionalData: `
          @import "@/assets/scss/variable.scss";
        `,
      },
    },
  },
});
