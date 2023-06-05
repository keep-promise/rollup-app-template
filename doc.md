# Rollup ESM打包器
Rollup和Webpack作用非常类似

## Rollup vs Webpack
1. Rollup 更为小巧 
2. Rollup仅仅是一款ESM打包器，没有其他额外功能
3. Webpack 可以完成前端模块化开发绝大数工作
4. Rollup中不支持类似HMR(模块热替换)这种高级特性

Rollup不是与Webpack竞争
目的：提供一个充分利用ESM各项特性的**高效打包器**
1. 构建出结构比较扁平、性能比较出众的**类库**

## demo1 --快速上手

### 安装rollp
```js
yarn rollup
```

### rollup cli
```js
rollup [options] <entry file>
```

### 执行打包
```js
yarn rollup ./src/index.js --format iife
// 入口文件./index.js，输出文件格式iife(自执行函数)，默认输出在控制台
yarn rollup ./src/index.js --format iife --file dist/bundle.js
// --file dist/bundle.js指定输出文件目录

```
输出文件
```js
(function () {
  'use strict';

  const log = msg => {
    console.log('------INFO-------');
    console.log(msg);
    console.log('-----------------');
  };

  var message = {
    hi: 'rollup hello'
  };

  const msg = message.hi;

  log(msg);

})();
```

### 打包结果分析
1. 打包结果简洁，输出结果没有任何多余代码
2. 打包结果就是把依赖的模块按照顺序拼接到一起
3. 打包结果只会包含用到的代码，默认开启tree shaking


## demo2 --配置文件
```js
yarn rollup --config rollup.config.js
// rollup默认是不会使用项目中的配置文件，需要加--config参数
```
package.json必须添加type: module属性才能识别rollup.config.js中使用的esm的语法
rollup.config.js
```js
export default {
  input: 'src/index.js', // 打包入口
  output: {
    file: 'dist/bundle.js', // 输出文件
    format: 'iife' // 输出格式自执行函数
  }
}
]
```

## demo1 --使用插件





## demo1 --快速上手






## demo1 --快速上手





## demo1 --快速上手





## demo1 --快速上手




## demo1 --快速上手