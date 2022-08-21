const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://apis.data.go.kr",
  },
});

// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: ["vuetify"],
//   devServer: {
//     proxy: {
//       "/api": {
//         target: "http://apis.data.go.kr",
//         changeOrigin: true,
//       },
//     },
//   },
// });
