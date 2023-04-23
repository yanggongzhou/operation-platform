/* craco.config.js */
const path = require("path");
module.exports = {
  devServer: {
    proxy: {
      '/dzapi': {
        target: 'http://192.168.0.241:8080',
        // target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/dzapi': ''
        }
      },
      '/app': {
        target: 'http://120.92.92.218:8080/',
        changeOrigin: true
      }
    },
  },

  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // 约定：使用 @scss 表示全局 SASS 样式所在路径
      // 在 SASS 中使用  tsconfig中 "@scss/*": ["src/assets/styles/*"]
      // '@scss': path.resolve(__dirname, 'src/assets/styles')
    }
  }
};
