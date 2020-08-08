/** 
 * @param {*} data 当前数据是不是对象
 */
const isObject = function(data) {

  return typeof data === "object" && data !== null

}

const def = function ( data, key, value) {
  
  Object.defineProperty( data, key, {

    enumerable: false,
    configurable: false,
    value: value

  })

}

export {

  isObject,
  def

}