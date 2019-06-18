var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
var TopicList = /** @class */ (function (_super) {
    __extends(TopicList, _super);
    function TopicList(props) {
        return _super.call(this, props) || this;
    }
    TopicList.prototype.componentDidMount = function () {
        // 获取数据
        this.props.topicStore.fetchTopics('all');
    };
    TopicList.prototype.bootstrap = function () {
        var _this = this;
        // 做数据的初始化
        // 可以异步的操作数据
        // 服务端渲染时，执行bootstrapper()方法(server-render.js中))时，就会来执行组件中此方法，
        // 组件中此方法执行结束后，才会继续渲染工作
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.props.appState.count = 4;
            }, 1000);
            resolve(true);
        });
    };
    TopicList.prototype.render = function () {
        return (<div>
                123123
            </div>);
    };
    TopicList = __decorate([
        inject('appState'), observer
    ], TopicList);
    return TopicList;
}(Component));
export default TopicList;
