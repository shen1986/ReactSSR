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
    + react-ssr 服务端渲染框架 优先
        * [原理](http://www.php.cn/js-tutorial-411822.html)
        * 安装 vscode 插件：EditorConfig for VS Code
        * 框架整理以及说明。
            1. 客户端的基本配置
                - build/webpack.config.client.js
                    + 构建前端框架的webpack配置，读取那个模板文件，指定入口，出口等。
                
                - .babelrc
                    + 现在写babel的配置一定要去看他们的管网。
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
                    + libraryTarget: 'commonjs2' 这个必须制定，说明commonjs2的模块规则。
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
                - 这里主要是用来规范代码风格的配置。基本eslint去官网查找规则。
                - `npm i babel-eslint eslint-config-airbnb eslint-config-standard eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard -D`
                - 全项目规则 `stardand` 标准规则
                - client规则 比较严格规则 `airbnb`, env 是执行环境。
                    + "semi":[0]  // 忽略`;`检测

- 分析原始企业网站
    + 要件，式样确定
    + 了解清楚里面有哪些要实现的功能。
- 开发
    + 进行react开发
- 测试

## 补充说明
- 通信都使用https