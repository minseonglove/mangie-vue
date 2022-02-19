const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
  //presets: [    '@vue/cli-plugin-babel/preset'  ]  // default code
  outputDir: "../src/main/resources/static",
  indexPath: "../static/index.html",
  configureWebpack:{
    plugins: [
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        minRatio: 0.8,
        threshold: 10240,
        test: /\.js(\?.*)?$/i,
      })
    ]
  },
  devServer: {
    port : 8080,   // 접속 포트 변경
    proxy: "http://localhost:8080",     // devServer :  Back-End , 즉 Spring Boot의 내장 was의 주소를 작성하게 되면 된다.
    compress: true,
    before(app){
      app.get('*.js', (req, res, next) => {
        req.url += '.gz'
        res.set('Content-Encoding', 'gzip')
        res.set('Content-Type', 'text/javascript')
        next()
      })
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader")
  },
};