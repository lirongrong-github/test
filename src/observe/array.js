// 会导致数据本身发生变化得方法 push shift unshift pop reverse sort splice

// 而 slice 并不会导致数组本身得变化 所以不需要重写

// 保留数组原生得方法
let oldArrayMethods = Array.prototype

// 原型链查找
//   -- 意思就是 用户通过使用数组方法时会先通过 __proto__ 
//   查找arrayMethods上面挂载得方法 ，如果说找不到我们重写得方法
//   就会去oldArrayMethods 上面查找上面保留得原生数组得方法
//   但是这里能改变数据本身得方法都被重写了， 所以只有不会改变数组本身得方法会到oldArrayMethods上去

// ***** 原型链得查找会依次向上查找 先查找重写得， 重写得没有会继续向上查找

// value.__proto__ = arrayMathods
// arrayMethosd.__proto__ = oldArrayMethods
export let arrayMethods = Object.create(oldArrayMethods)

const methods = [

  'push',
  'shift',
  'unshift',
  'pop',
  'sort',
  'reverse',
  'splice'

]

methods.forEach( method => {

  arrayMethods[method] = function (...args) {
    
    // AOP 切片编程
    // 在这里还需要调用原生数组得方法
    const result =  oldArrayMethods[method].apply( this, args )

    // push unshift 添加得元素可能为一个对象
    let inserted,
        ob = this.__ob__

    switch (method) {
      case 'push':
      case 'unshift':
        console.log(12)
        inserted = args
        break
      
      case 'splice':
        inserted = args.splice(2)

      default:
        break
    }

    if ( inserted ) ob.observeArray(inserted)

    return result

  }

})