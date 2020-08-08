import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {

  // 打包入口文件
  input: './src/index.js',

  // 打包后出口文件
  output: {

    // 打包后得文件存放地址
    file: "dist/umd/vue.js",

    // 指定打包后全局变量得名字
    name: 'Vue',

    // 统一模块规范
    format: 'umd',

    // ES6 --> ES5 开启源码调试  可以找到源代码得报错位置
    sourcemap: true

  },

  plugins: [

    babel({

      exclude: "node_modules**"

    }),

    // 如果当前环境变量卫开发模式, 则启动serve服务, 否则不配置 serve 插件
    process.env.ENV === 'development' ? serve({

      open: true, // 自动打开网页

      openPage: '/public/index.html', // 默认打开得heml文件

      port: 3000, //端口号

      contentBase: '' // 表示已当前文件得路径来启动一个服务

    }) : null,

    // 热更新 默认监听根文件夹
    livereload()

  ]

}