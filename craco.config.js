/* craco.config.js */
const path = require("path");
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.10.71:10000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      before: (app) => {
        app.get('/api/hw-adserving/dropList/baseInfoList', function (req, res) {
          res.json({
            "code": 200,
            "data": {
              "app": [
                "webfic",
                "小说大全",
                "小说快读",
                "热门小说大全",
                "小说阅读吧",
                "gostory",
                "novelread",
                "krfic",
                "其他"
              ],
              "country": [
                {
                  "countryCode2": "AL",
                  "countryCode3": "ALB",
                  "countryName": "阿尔巴尼亚",
                  "countryNum": "8",
                  "id": "1"
                }
              ],
              "pline": [
                {
                  "field": "webfic",
                  "text": "WEBFIC"
                },
                {
                  "field": "繁体",
                  "text": "FT"
                },
                {
                  "field": "gostory",
                  "text": "GOSTORY"
                },
                {
                  "field": "novelread",
                  "text": "NOVELREAD"
                },
                {
                  "field": "krfic",
                  "text": "KRFIC"
                },
                {
                  "field": "未知",
                  "text": "UNKNOWN"
                }
              ],
              "language": [
                {
                  "display": "English",
                  "zhName": "英语"
                },
                {
                  "display": "Chinese",
                  "zhName": "中文"
                },
                {
                  "display": "English-tagalog",
                  "zhName": "英语(菲律宾本土语言)"
                },
                {
                  "display": "Español",
                  "zhName": "西班牙语"
                },
                {
                  "display": "Nederlands",
                  "zhName": "荷兰语"
                },
                {
                  "display": "Deutsch",
                  "zhName": "德语"
                },
                {
                  "display": "Français",
                  "zhName": "法语"
                },
                {
                  "display": "Italiano",
                  "zhName": "意大利语"
                },
                {
                  "display": "Românâ",
                  "zhName": "罗马尼亚语"
                },
                {
                  "display": "Tagalog",
                  "zhName": "菲律宾语"
                },
                {
                  "display": "Bahasa Indonesia",
                  "zhName": "印尼语"
                },
                {
                  "display": "Bahasa Melayu",
                  "zhName": "马来语"
                },
                {
                  "display": "Tiếng việt",
                  "zhName": "越语"
                },
                {
                  "display": "العربية",
                  "zhName": "阿拉伯语"
                },
                {
                  "display": "ไทย",
                  "zhName": "泰语"
                },
                {
                  "display": "한국인",
                  "zhName": "韩语"
                },
                {
                  "display": "Other",
                  "zhName": "其他语言"
                }
              ],
              "media": [
                {
                  "field": "facebook",
                  "text": "FACEBOOK"
                },
                {
                  "field": "Google",
                  "text": "GOOGLE"
                },
                {
                  "field": "Tik Tok",
                  "text": "TIKTOK"
                }
              ],
              "type": [
                "普通广告",
                "落地页广告"
              ],
              "device": [
                "IOS",
                "ANDROID"
              ]
            },
            "msg": "SUCCESS"
          })
        });
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
