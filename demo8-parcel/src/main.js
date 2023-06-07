import foo from './foo';
import './index.css'


foo.bar();

// 通过module.hot判断是否支持热替换hmr
if (module.hot) {
  module.hot.accept(() => {
    console.log('hmr')
  })
}

