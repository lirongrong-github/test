/**
 * @param{
 * 
 *  target: '目标对象',
 *  handler: '处理目标对象得一些属性和方法'
 * 
 * }
 * 
 * 通过原对象去修改属性值时不会触发代理对象得 get set
 * 
 */
// let proxy = new Poxy( target, handler )

let target = {

  a: 1,
  b: 2

}

let proxy = new Proxy( target, {

  get( target, prop ) {

    return `This is property value ${target[prop]}`

  },

  set( target, prop, value ) {

    // console.log('222')
    target[prop] = value

  },  

})

// console.log(target.a)
// 通过代理得proxy去访问属性a就会通过proxy得get方法
// console.log(proxy.a)

proxy.a = 10
// target.a = 20

// console.log( target )

// 在node环境中 设置也会走 get 方法 ???
// console.log( proxy )

let arr = [

  { name: 'lili', age: 20 },
  { name: 'rongrong', age: 30 },
  { name: 'xiaoxiao', age: 23 },
  { name: 'susu', age: 21 },
  { name: 'juanjuan', age: 25 },
  { name: 'wenwen', age: 28 }
]

let person = new Proxy( arr, {

  get ( target, prop ) {

    return Reflect.get( target, prop )

  },

  set ( target, prop, value ) {

    let isOk = Reflect.set( target, prop, value )

    if ( isOk ) console.log( 'Set successfilly' )

  }

})

console.log(person[0] = { name: 'zzz', age: 21 })

// console.log(arr === person)

// Node 打印为空对象
// console.log(Object.prototype)

// console.log(Reflect)

console.log(Reflect.has( target, 'a' ))
console.log(Reflect.has( target, 'c' ))
