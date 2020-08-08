// 只是Vue得一个声明

import { initMixin } from './init'

// vue 核心代码
function Vue(options) {

  // 进行Vue初始化操作
  this._init(options)

}

// Vue.prototype._init = function() {


// }

initMixin(Vue)

// 通过引入文件得方式, 给Vue原型上添加方法

export default Vue