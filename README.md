# webpack4 + ES6/7 + jquery的多页面开发的模板

简介：
使用jquery开发页面，包括热更新等最新功能，可自行封装基于CMD规范的组件
react、vue请使用官方脚手架

使用方式：
git clone或者直接下载项目， npm install安装所有依赖包

项目目录：
src：开发目录
static：静态资源目录，该目录不会被打包，会被直接复制到对应环境的static目录下
dist：打包目录（直接部署服务器即可）

src/pages：新建页面请按照该目录下的结构来
例如：新建页面pageA.html，pageA.js即为该页面的主入口文件，可从主入口文件直接引用类库或者插件，
打包后分为两个js被引入页面，第三方库被打包为vendor.js，其余js则被混淆打包为pageA.js,可自行查看打包后的文件结构。
图片的引用方式请看test.js
