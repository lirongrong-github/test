
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  // 会导致数据本身发生变化得方法 push shift unshift pop reverse sort splice
  // 而 slice 并不会导致数组本身得变化 所以不需要重写
  // 保留数组原生得方法
  var oldArrayMethods = Array.prototype; // 原型链查找
  //   -- 意思就是 用户通过使用数组方法时会先通过 __proto__ 
  //   查找arrayMethods上面挂载得方法 ，如果说找不到我们重写得方法
  //   就会去oldArrayMethods 上面查找上面保留得原生数组得方法
  //   但是这里能改变数据本身得方法都被重写了， 所以只有不会改变数组本身得方法会到oldArrayMethods上去
  // ***** 原型链得查找会依次向上查找 先查找重写得， 重写得没有会继续向上查找
  // value.__proto__ = arrayMathods
  // arrayMethosd.__proto__ = oldArrayMethods

  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'sort', 'reverse', 'splice'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // AOP 切片编程
      // 在这里还需要调用原生数组得方法
      var result = oldArrayMethods[method].apply(this, args); // push unshift 添加得元素可能为一个对象

      var inserted,
          ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          console.log(12);
          inserted = args;
          break;

        case 'splice':
          inserted = args.splice(2);
      }

      if (inserted) ob.observeArray(inserted);
      return result;
    };
  });

  /** 
   * @param {*} data 当前数据是不是对象
   */
  var isObject = function isObject(data) {
    return _typeof(data) === "object" && data !== null;
  };

  var def = function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  };

  var ObServer = /*#__PURE__*/function () {
    function ObServer(value) {
      _classCallCheck(this, ObServer);

      def(value, "__ob__", this); // 如果是数组的话并不想去监听数组得索引，会导致性能问题
      // push shift unshift 可以操作数组 所以需要重写

      value.__proto__ = arrayMethods; // 在用户调用数组得原生方法时就是走这里， 相当于代理/装饰
      // 如果数组里面放的是对象， 才会进行观测

      if (Array.isArray(value)) {
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(ObServer, [{
      key: "walk",
      value: function walk(data) {
        // Object.keys 获取对象得key
        var keys = Object.keys(data); // ["name", "age", "sex", "adreess"]
        // for( let i = 0; i < keys.length; i++ ) {
        //   let key = keys[i]
        //   let value = data[key]
        //   defineReactive(data, key, value) // 定义响应式数据
        // }

        keys.forEach(function (item) {
          defineReactive(data, item, data[item]);
        });
      }
    }, {
      key: "observeArray",
      value: function observeArray(value) {
        value.forEach(function (item) {
          // [{},{},{}] -- 判断了是不是对象在进行观测， 不是对象则不观测
          observe(item);
        });
      }
    }]);

    return ObServer;
  }();

  function defineReactive(data, key, value) {
    observe(value); // 递归实现深度检测

    Object.defineProperty(data, key, {
      // 在获取值得时候可操作
      get: function get() {
        return value;
      },
      // 在设置值是可操作
      set: function set(newValue) {
        if (newValue === value) return; // console.log( '值发生变化' )
        // 如果用户修改得值为一个对象
        //    再次调用observe 进行数据观测

        observe(newValue);
        value = newValue;
      }
    });
  }

  function observe(data) {
    // 判断data 是不是一个对象
    var isObj = isObject(data);
    if (!isObj) return;
    return new ObServer(data);
  }

  function initState(vm) {
    var opts = vm.$options;
    if (opts.props) ;
    if (opts.methods) ;
    if (opts.data) initData(vm);
    if (opts.computed) ;
    if (opts.watch) ;
  }

  function initData(vm) {
    // 数据得初始化操作
    var data = vm.$options.data; // 用户传递得data
    // 把data 赋值到实例得_data上 允许用户通过_data修改

    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 对象劫持 用户改变了数据 我需要得到通知 ==> 刷新页面
    // mvvm 数据变化可以驱动视图变化
    // Object.defineProperty() 给对象增加 get() set()

    observe(data); // 响应式原理
  }

  // }
  // 再原型上添加一个init方法

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      // 数据得劫持
      var vm = this;
      vm.$options = options;
      initState(vm);
    };
  }

  // 只是Vue得一个声明

  function Vue(options) {
    // 进行Vue初始化操作
    this._init(options);
  } // Vue.prototype._init = function() {
  // }


  initMixin(Vue); // 通过引入文件得方式, 给Vue原型上添加方法

  return Vue;

})));
//# sourceMappingURL=vue.js.map
