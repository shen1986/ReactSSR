# ReactSSR
React 服务端渲染

## 概要和目的
- 做一个企业的门户网站，先做前端页面，用React的服务端渲染。
目的是要学习React的服务端渲染知识。
- 如果可能的话，同样做一套预渲染的页面，比较他们之间的优缺点和差异。

## 技术
- react
- webpack
- less
- typescript

## 项目计划
- 前期调查
    + react-同构框架做成。
        * 尝试构建同构应用 `enterprise-isomorphism` 作为 react-ssr的一个例子（起源）。
        * 同构第三方框架 `beidou`
        * 暂时放弃第三方同构，学习成本有点高。
    + react-prerender预渲染框架学习
        * https://www.jianshu.com/p/5c63c07b51b6
    + react-ssr 服务端渲染框架 **优先**
        * [原理](http://www.php.cn/js-tutorial-411822.html)
        * [React + Express – SSR Setup with TypeScript](https://github.com/manuelbieh/react-ssr-setup)
            1. 用 typeScript 写的 ssr 框架，直接使用没有学习的效果，只做参照。
        * 安装 vscode 插件：EditorConfig for VS Code
            1. 这个统一文件格式的东西太好用了，以后所有项目都会使用。
        * 框架整理以及说明。
            1. 客户端的基本配置
                - build/webpack.config.client.js
                    + 构建前端框架的webpack配置，读取那个模板文件，指定入口，出口等。
                
                - .babelrc
                    + 现在写babel的配置一定要去看他们的官网。
                    + 指定支持es语法，现在用[@babel/preset-env](https://babeljs.io/docs/en/env)
                    + 指定支持jsx语法，[@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react#docsNav)

                - client
                    + app.js
                        * 程序的主入口
                    + App.jsx
                        * 入口渲染组件
                    + server-entry.js
                        * 服务端程序的主入口
                    + template.html
                        * 模板html文件

            2. 服务端渲染的基本配置 （seo不友好，首次请求时间长，体验不好的解决方案） react-dom/server
                - build/webpack.config.server.js
                    + 配置服务端渲染的webpack,这样将client里面的入口文件打包成为服务端可用的js代码，再通过express来运行这个文件。
                    + target: 'node' 指明是node环境，这样node的基本组件不会被打包。
                    + libraryTarget: 'commonjs2' 这个必须制定，说明是commonjs2的模块规则。
                    node都是用的这种规则（生成的文件会这样：module.exports = {}， require('./a.js'))
                    + 入口文件指定为 `server-entry.js`
                - server.js
                    + 开启一个express的服务
                    + 导入dist下 `server-entry.js` 和 `index.html`(通过模板html生成的客户端HTML文件)。
                    + 通过 `ReactSSR.renderToString` 的方法来渲染数据层的HTML。

            3. 客户端开发环境配置
                - 利用 webpack-dev-server 来开启一个服务，热更新，服务ip，端口号等。
                - .babelrc
                    + 支持热更新,[react-hot-loader/babel](https://www.npmjs.com/package/react-hot-loader)
                        * 热更新的时候必须相应的写一些代码，且 webpack必须开启热更新
                        * 热更新的组件需要通过`AppContainer`包裹。
                        ```javascript
                        // 有文件变动的情况下，通过热更新重新渲染App
                        if (module.hot) {
                            module.hot.accept('./App.jsx', () => {
                                const NextApp = require('./App.jsx').default;
                                render(NextApp);
                            });
                        }
                        ```

            4. 服务端开发环境配置
                - 利用 nodemon server.js 来运行一个服务。
                - `util/dev-static.js` 

            5. eslint 和 ethorConfig 配置
                - .editorconfig: 为了避免windows环境，linux环境，mac环境差异
                把所有的文字编码统一化，统一`utf-8`格式，换行缩进`4`个空格，换行都用`lf`等等。
                打开编辑器按保存的时候会自动格式化文件。
                - 这里主要是用来规范代码风格的配置。基本eslint去官网查找规则。
                - 需要安装的插件 `npm i babel-eslint eslint-config-airbnb eslint-config-standard eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard -D`
                - 全项目规则 `stardand` 标准规则
                    + "indent": [0] 我喜欢缩进4个空格，所以我把它缩进2个空格的规则忽略掉了。
                    + "semi": "off" 我喜欢在结尾加上`;`,所以我把它结尾不能加`；`的规则忽略掉了。
                - client规则 比较严格规则 `airbnb`, airbnb 是一个比较有名的写node 的公司。
                    + env 是执行环境。
                    + "semi":[0]  // 忽略`;`检测 我不喜欢忽略`;`，如果你不喜欢写`;`，可以加上这个配置
                    + "react/jsx-indent": [0] 我喜欢缩进4个空格，所以我把它缩进2个空格的规则忽略掉了。
                    + "react/jsx-filename-extension": [0] 不能在js里面有jsx语法， 我里面有些使用js写的，直接忽略了。
                - 给git Commit也加上eslint规则检查
                    + `npm i husky -D` 安装哈士奇
                    +  `"lint": "eslint --ext .js --ext .jsx client/"` package.json里面添加eslint检查
                    +  `"precommit": "npm run lint"` 执行commit的时候，哈士奇会先执行这里的命令。

            6. 优化
                - 提取 webpack 的共通部分。通过 `webpack-merge` 来处理。
                - 安装 `npm i serve-favicon -S` 用来配置 favicon
                - 安装 `npm i nodemon -D` 用来配置服务端渲染开发环境
            
            7. 目录结构
                - views 功能页面
                - config 配置目录
                - store 存储组件
                - components 非业务组件
                - 更高级的组件打包到 npmjs.com 网站里面（一般是不指定某个项目，每个项目都能使用的组件，选择放在npm更好，自己上传，然后npm install就好了。）
            
            8. 路由配置
                - 使用 react-router-dom 来配置路由（react-router的包 包含 react-router-dom（浏览器中运行） 和 react-router-native（React Native应用程序） 一般不会直接使用）

            9. store 配置
                - 传统 react-redux 的做法 每次都会生成一个新的 state 规则比较死，而且占用内存。我这里使用 Mobx
                - Mobx 的规则比较松散，所以写的时候一定要注意

                - 配置装饰器
                - `npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D`

                - 安装mobox 以及 react 对 mobox 的支持。
                - `npm i mobx mobx-react -S`

                - 使用了props的方法的时候 要引入 porp-types。
                - `npm i prop-types -S`
            10. 使用[cnode](https://cnodejs.org/api)接口 代理接口 
                - 配置 express 的通信功能。
                - `npm i body-parser express-session query-string -S`
            11. 在 client 的 test 里面调试接口
            12. 服务端渲染优化
                - 配置服务端路由
                - store数据同步
                - `npm i react-async-bootstrapper -S`
                - `npm i ejs-compiled-loader ejs -S`
                - `npm i serialize-javascript -S`
            13. SEO相关优化
                - title,seo友好标签
                - `npm i react-helmet -S` 标签服务端渲染
                - [踩到一个大大的坑](https://github.com/ReactTraining/react-router/issues/6751)
                - [真坑爹](https://github.com/ReactTraining/react-router/issues/6704)
                - [继续坑啊](https://github.com/ReactTraining/react-router/issues/6629)
                - 只能知道是router-dom可能对异步渲染有点要求，参照 typeScript 写的 ssr 框架 里面用的 connected-react-router，现在占时没解决。
                    + 埋了一些暗黑的代码。暂时解决。
            14. Material-UI 组件导入
                - [Material-UI](https://material-ui.com/) 号称是React最著名的组件库。
                    + IE兼容性不高，只兼容ie11以后的浏览器。
                - [MaterialUI的服务端渲染说明](https://material-ui.com/guides/server-rendering/)
                - `npm install @material-ui/icons @material-ui/core -S`
                - `npm i react-jss jss jss-preset-default -S`
        + react-koa-ssr 服务端渲染框架升级 
            1. 慢慢做请可能的给代码打上注释。
        + 发现新的框架 [next.js](https://nextjs.org/)

- 分析原始企业网站
    + 要件，式样确定
    + 了解清楚里面有哪些要实现的功能。
- 开发
    + 进行react开发
- 测试

## 补充说明
- 通信都使用https

## 备注记忆
- React16 render 不限定要返回一个根组件包裹的对象了，可以返回一个数组。

## 犯的错
1. 习惯性的把webpack安装成了开发模块里了 `npm i webpack -D`，我明明在服务端渲染的时候通过webpack来导入客户端的react程序，这表明这个依赖是在生产的时候也要用到的。这个太失败了。应该用`npm i webpack -S`。
2. 以为用typescript 就可以把所有`extensions`里面的 `.js` `.jsx` 去掉，但是像react-dom 这一类的第三方依赖，里面充斥着 import .js .jsx 的代码，所以webpack 编译的时候一直报错，这个错误查了2天。实在愚蠢。
3. babel 很强大，以前我都是先通过ts-loader解析ts代码再传给babel进行高级语法解析，现在babel本身就能够解析typeScript的语法了，但是这又和webpack的基本理论（模块功能单一）相违背了。不过站在我的角度上好用就可以了。