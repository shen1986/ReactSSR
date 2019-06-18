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
import React, { Component } from 'react';
var TopicDetail = /** @class */ (function (_super) {
    __extends(TopicDetail, _super);
    function TopicDetail(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TopicDetail.prototype.componentDidMount = function () {
        // do something
    };
    TopicDetail.prototype.render = function () {
        return (<div>
                123123
      </div>);
    };
    return TopicDetail;
}(Component));
export default TopicDetail;
