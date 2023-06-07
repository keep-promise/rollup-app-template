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

## demo3 --使用插件
rollup自身功能只是esm模块的打包
如果需要支持
1. 加载其它类型资源模块
2. 导入CommonJs模块
3. 编译ECMAScript新特性
可以使用插件的方式来实现扩展
插件是rollup唯一扩展途径
通过plugins数组配置插件
plugins:[
  
]
源码中使用
```js
import { name, version } from '../package.json';
```
打包结果只会包含name、version，其他属性都会被tree shaking
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

  var name = "demo3";
  var version = "1.0.0";

  const msg = message.hi;

  log(msg);
  log(name);
  log(version);

}());
```


## demo4 --加载 NPM 模块
rollup默认只能通过文件路径导入本地模块
对于node_modules中第三方模块，并不能像webpack中那样通过模块名称带入模块
rollup需要使用rollup-plugin-node-resolve插件
使用该插件就可以通过模块名称带入模块
```js
import _ from 'lodash-es';
```

## demo5 --加载 CommonJS模块
rollup设计只处理esm模块打包，如果项目中使CommonJS模块，默认是不支持
目前很多npm是通过CommonJS导出成员，如果需要使用CommonJS模块
需要使用rollup-plugin-commonjs

## demo6 --代码拆分（code splitting) 分包
1. 通过dynamic imports实现模块的按需加载
2. rollup内部自动处理代码拆分（分包）

注：打包输出格式format不能设置为iife(自执行函数)，因为iife格式输出格式会把所有模块放到自执行函数中，没有
像webpack打包输出的引导代码，没办法实现代码拆分，输出格式format只能设置为amd或commonjs等其他标准
代码拆分会输出多个文件，因此不能设置单个输出文件
打包输出为amd，项目必须要使用实现amd规范的库去加载，比如requirejs

## demo7 --多入口打包
打包输出为amd，项目必须要使用实现amd规范的库去加载，比如requirejs
多入口打包：数组形式/对象形式

## rollup vs webpack 使用场景
rollup优点
1. 输出结果更加扁平，因此执行效率更高
2. 自动移除未引用代码
3. 打包结果依然完全可读

rollup缺点
1. 加载非 ESM 的第三方模块比较复杂，需要配置插件处理
2. 模块最终都被打包到一个函数中，无法实现HMR
3. 浏览器环境中，代码拆分功能依赖AMD库

### 开发应用程序
面临大量引入第三方模块的需求，且需要HMR功能提高开发调试效率，应用规模大了之后，需要分包
因此rollup不适合，这类适合使用webpack

### 开发框架或者类库
很少在代码中引入第三方模块，大多数知名框架/库【react、vue】都使用rollup作为模块打包器

上面是经验标准，非绝对准则，rollup也可以去开发应用程序，webpack也可以开发类库/框架

### 总结
webpack大而全，rollup小而美


## demo8 Parcel 零配置前端应用打包器
npm包名：parcel-bundler
parcel打包入口推荐html文件作为打包入口，理由：html是web应用程序的入口文件
1. 热替换
2. 自动安装依赖(直接使用未安装的模块，parcel会自动安装，且不需要重启应用)
3. 支持加载其他类型的资源模块，并不需要安装其他其他插件/loader
4. 支持动态导入，自动帮助代码拆分

使用parcel从头到尾只执行了parcel命令，无需配置

开发调试命令：yarn parcel src/index.html

生产模式打包：yarn parcel build src/index.html

parcelg构建速度会比webpack快很多，因为parcel使用多进程同时工作，充分发挥多核cpu性能

webpack也可使用happypack插件实现

优点：零配置，只关心开发业务逻辑，无需关注项目配置，构建速度更快

### parcel vs webpack
parcel优点：零配置，只关心开发业务逻辑，无需关注项目配置，构建速度更快
webpack优点：生态好，扩展更丰富，出现问题容易解决，越来越好用
综合还是选择webpack


