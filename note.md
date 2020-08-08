npm i rollup @babel/core @babel/preset-env rollup-plugin-babel rollup-plugin-serve cross-env rollup-plugin-livereload -D

// 打包工具 --> 专助于javascript打包
rollup

// 使用babel得核心模块
@babel/core

// 把高级语法转换为低级语法
@babel/preset-env

// 让 rollup 能够使用 babel
rollup-plugin-babel

// 实现静态服务
rollup-plugin-serve

// 配置环境变量
cross-env

// 热更新代码
rollup-plugin-livereload


// 使用当前文件得 rollup.config.js 得配置文件
rollup -c

// 使用cross-env 配置环境变量
//    -w ( -wath ) 实时打包
//    -c 使用当前项目得 rollup 配置文件
"serve": "cross-env Env=devlopment rollup -c -w" 


cont 声明得变量不可重新被赋值  赋值会报错 -- data is read-only 