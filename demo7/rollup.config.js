export default {
  // input: ['src/index.js', 'src/a.js', 'src/b.js'], // 多入口打包：数组形式
  input: {
    index: 'src/index.js',
    a: 'src/a.js',
    b: 'src/b.js'
  }, // 多入口打包：对象形式
  output: {
    dir: 'dist', // 输出文件目录
    format: 'amd' // 输出格式自执行函数
  }
}