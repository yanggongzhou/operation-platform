/* craco.config.js */
const path = require("path");
module.exports = {
  devServer: {
    proxy: {
      '/hw-adserving': {
        target: 'http://192.168.0.241:9999',
        // target: 'http://192.168.1.116:9999',
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
