import React from 'react';
import { renderToString } from 'react-dom/server';
import { AppComponent } from './AppComponent';

// 导出渲染函数，以供采用Node.js编写的HTTP服务器代码调用
export function render() {
    // 将根组件渲染成Html字符串
    return renderToString(<AppComponent/>)
}