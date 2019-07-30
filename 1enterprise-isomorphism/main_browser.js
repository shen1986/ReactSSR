import React from 'react';
import { render } from 'react-dom';
import { AppComponent } from './AppComponent';
// 将根组件渲染到Dom树上
render(<AppComponent/>, window.document.getElementById("app"));