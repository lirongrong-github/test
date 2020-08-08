import { arrayMethods } from "./array.js"

import { isObject, def } from "../util/index"

class ObServer {

  constructor ( value ) {

    def( value, "__ob__", this )

    // 如果是数组的话并不想去监听数组得索引，会导致性能问题
    // push shift unshift 可以操作数组 所以需要重写
    value.__proto__ = arrayMethods // 在用户调用数组得原生方法时就是走这里， 相当于代理/装饰

    // 如果数组里面放的是对象， 才会进行观测
    if ( Array.isArray(value) ) {
      
      this.observeArray(value)

    } else {

      this.walk(value)

    }

  }

  walk ( data ) {

    // Object.keys 获取对象得key
    let keys = Object.keys(data) // ["name", "age", "sex", "adreess"]

    // for( let i = 0; i < keys.length; i++ ) {

    //   let key = keys[i]
    //   let value = data[key]
    //   defineReactive(data, key, value) // 定义响应式数据

    // }

    keys.forEach( item => {

      defineReactive( data, item, data[item] )

    })

  }

  observeArray ( value ) {

    value.forEach( item => {
      
      // [{},{},{}] -- 判断了是不是对象在进行观测， 不是对象则不观测
      observe(item)

    })

  }

}

function defineReactive( data, key, value ) {

  observe(value) // 递归实现深度检测

  Object.defineProperty( data, key, {

    // 在获取值得时候可操作
    get () {
      return value
    },

    // 在设置值是可操作
    set (newValue) {

      if ( newValue === value ) return

      // console.log( '值发生变化' )

      // 如果用户修改得值为一个对象
      //    再次调用observe 进行数据观测
      observe(newValue)

      value = newValue

    }

  } )  

}

export function observe(data) {

  // 判断data 是不是一个对象
  let isObj = isObject(data)

  if (!isObj) return

  return new ObServer(data)

}