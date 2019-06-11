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
                - 更高级的组件打包到 npmjs 网站里面
            
            8. 路由配置
                - 

- 分析原始企业网站
    + 要件，式样确定
    + 了解清楚里面有哪些要实现的功能。
- 开发
    + 进行react开发
- 测试

## 补充说明
- 通信都使用https

## 备注记忆
- React16 render 不需要返回一个根组件包裹的对象了，可以返回一个数组。