const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "https://apis.data.go.kr",
  },
  // devServer: {
  //   host: "localhost",
  //   port: 80,
  //   proxy: {
  //     "/v2": {
  //       target: "http://dapi.kakao.com",
  //       changeOrigin: true,
  //     },
  //     "/v2": {
  //       target: "http://dapi.kakao.com",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});

// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: ["vuetify"],
//   devServer: {
//     proxy: {
//       "/api": {
//         target: "http://apis.data.go.kr",
//         changeOrigin: true,
//         pathRewrite: {
//           "^/api": "/",
//         },
//       },
//     },
//   },
// });
