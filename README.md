# ReactSSR
企业门户网站前端

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
        * 尝试构建同构应用 `enterprise-isomorphism`
        * 同构第三方框架 `beidou`
        * 暂时放弃同构，成本有点高。
    + react-prerender预渲染框架学习
        * https://www.jianshu.com/p/5c63c07b51b6
    + react-ssr 服务端渲染框架 优先
        * 安装 vscode 插件：EditorConfig for VS Code
        * 框架整理以及说明。
            1. 前端的基本配置
                - build/webpack.config.client.js
                - .babelrc
                - client
            2. 服务端渲染的基本配置 （seo不友好，首次请求时间长，体验不好的解决方案） react-dom/server
                - client/server-entry.js
                - build/webpack.config.server.js
            3. 前端开发环境配置
                - 
            4. 服务端开发环境配置
                - 
            5. eslint 和 ethorConfig 配置
                - "semi":[0]  // 忽略`;`检测


                
- 分析原始企业网站
    + 要件，式样确定
    + 了解清楚里面有哪些要实现的功能。
- 开发
    + 进行react开发
- 测试

## 补充说明
- 通信都使用https