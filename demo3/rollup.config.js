import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js', // 打包入口
  output: {
    file: 'dist/bundle.js', // 输出文件
    format: 'iife' // 输出格式自执行函数
  },
  plugins: [
    json() // 使用json插件，就可以在项目中使用json文件
  ]
}