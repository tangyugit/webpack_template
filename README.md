# webpack_template
# webpack4的模板，可在普通项目中直接拿来使用
# webpack4配置ES6环境
# babel-loader: 负责 es6 语法转化
# babel-preset-env: 包含 es6、7 等版本的语法转化规则
# babel-plugin-transform-runtime: 避免 polyfill 污染全局变量(转换插件)
# babel-polyfill: es6 内置方法和函数转化垫片(项目主入口引入 -S)
# babel-runtime: 是供编译模块复用工具函数(充满polyfill的包，-S)