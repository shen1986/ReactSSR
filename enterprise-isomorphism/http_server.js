const express = require('express');
const { render } = require('./dist/bundle_server');
const app = express();
// 调用构建出的bundle_server.js中暴露出的渲染函数，在拼接HTML模板，形成完整的HTML文件
app.get('/', function(req, res) {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>企业门户网站</title>
        </head>
        <body>
            <div id="app">${render()}</div>
            <!-- 导入Webpack输出的用于浏览器端的渲染的JavaScript文件 -->
            <script src="./dist/bundle_browser.js"></script>
        </body>
        </html>
    `);
});
// 其他请求路径返回对应的本地文件
app.use(express.static('.'));
app.listen(3000, function() {
    console.log('app listening on port 3000!')
});