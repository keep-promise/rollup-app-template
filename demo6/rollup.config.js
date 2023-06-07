export default {
  input: 'src/index.js', // 打包入口
  output: {
    // file: 'dist/bundle.js', // 输出文件 代码拆分会输出多个文件，因此不能设置单个输出文件
    // format: 'iife' // 输出格式自执行函数
    dir: 'dist',
    format: 'amd'
  }
}