import { observe } from './observe/index.js'

export function initState(vm) {

  const opts = vm.$options

  if ( opts.props )

    initProps(vm)

  if ( opts.methods )

    initMethods(vm)

  if ( opts.data )

    initData(vm)

  if ( opts.computed )

    initComputed(vm)

  if ( opts.watch )

    initWatch(vm)

}

function initProps() {


}

function initMethods() {

  
}

function initData(vm) {

  // 数据得初始化操作
  let data = vm.$options.data // 用户传递得data

  // 把data 赋值到实例得_data上 允许用户通过_data修改
  data = vm._data = typeof data === 'function' ? data.call(vm) : data

  // 对象劫持 用户改变了数据 我需要得到通知 ==> 刷新页面
  // mvvm 数据变化可以驱动视图变化

  // Object.defineProperty() 给对象增加 get() set()
  observe(data) // 响应式原理
  
}

function initComputed() {

  
}

function initWatch() {

  
}