import { initState } from "./state.js"

// Vue.prototype._init = function() {


  
// }

// 再原型上添加一个init方法
export function initMixin(Vue) {

  // 初始化流程
  Vue.prototype._init = function(options) {

    // 数据得劫持
    const vm = this
    vm.$options = options

    initState(vm)

  
  }

}