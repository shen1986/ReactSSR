var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, computed, action } from 'mobx';
var AppState = /** @class */ (function () {
    function AppState(_a) {
        var _b = _a === void 0 ? { count: 0, name: 'shenxf' } : _a, count = _b.count, name = _b.name;
        this.count = count;
        this.name = name;
    }
    Object.defineProperty(AppState.prototype, "msg", {
        get: function () {
            return this.name + " say count is " + this.count;
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.add = function () {
        this.count += 1;
    };
    // 服务端渲染用到的数据与客户端渲染用到的store数据不同步解决方法
    // 将AppState这个实例在服务端渲染完成之后得到的数据以json的格式取得，之后将这部分数据插入到客户端中
    AppState.prototype.toJson = function () {
        return {
            count: this.count,
            name: this.name,
        };
    };
    __decorate([
        observable
    ], AppState.prototype, "count", void 0);
    __decorate([
        observable
    ], AppState.prototype, "name", void 0);
    __decorate([
        computed
    ], AppState.prototype, "msg", null);
    __decorate([
        action
    ], AppState.prototype, "add", null);
    return AppState;
}());
export default AppState;
