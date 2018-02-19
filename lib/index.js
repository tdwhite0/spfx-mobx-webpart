"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var React = require("react");
var ReactDom = require("react-dom");
var mobx_react_1 = require("mobx-react");
var WebpartStore = /** @class */ (function () {
    function WebpartStore() {
        this.properties = mobx_1.observable.map();
    }
    __decorate([
        mobx_1.observable
    ], WebpartStore.prototype, "properties", void 0);
    __decorate([
        mobx_1.observable
    ], WebpartStore.prototype, "context", void 0);
    return WebpartStore;
}());
exports.WebpartStore = WebpartStore;
var Store = /** @class */ (function () {
    function Store() {
        this.webpart = new WebpartStore();
    }
    return Store;
}());
exports.Store = Store;
function makeObservableWebPart(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.timestamp = Date.now();
            _this.store = new Store();
            _this.getPropertyPaneConfiguration = function () {
                return _super.prototype.getPropertyPaneConfiguration.call(_this);
            };
            _this.onPropertyPaneFieldChanged = function (targetProperty, oldValue, newValue) {
                _this.store.webpart.properties.set(targetProperty, newValue);
                return _super.prototype.onPropertyPaneFieldChanged.call(_this, targetProperty, oldValue, newValue);
            };
            return _this;
        }
        class_1.prototype.onInit = function () {
            var _this = this;
            return _super.prototype.onInit.call(this).then(function () {
                _this.store.webpart.properties.clear();
                _this.store.webpart.properties.merge(_this.properties);
                return Promise.resolve(true);
            });
        };
        return class_1;
    }(Base));
}
exports.makeObservableWebPart = makeObservableWebPart;
function connectWebPartWithReactComponent(Base, Component) {
    return /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.store = new Store();
            _this.onPropertyPaneFieldChanged = function (targetProperty, oldValue, newValue) {
                _this.store.webpart.properties.set(targetProperty, newValue);
                return _super.prototype.onPropertyPaneFieldChanged.call(_this, targetProperty, oldValue, newValue);
            };
            return _this;
        }
        class_2.prototype.render = function () {
            if (this.renderedOnce) {
                return;
            }
            ReactDom.render(React.createElement(mobx_react_1.Provider, __assign({}, this.store),
                React.createElement(Component, null)), this.domElement);
        };
        class_2.prototype.onInit = function () {
            var _this = this;
            return _super.prototype.onInit.call(this).then(function () {
                _this.store.webpart.properties.clear();
                _this.store.webpart.properties.merge(_this.properties);
                _this.store.webpart.context = mobx_1.observable(_this.context);
                return Promise.resolve(true);
            });
        };
        class_2.prototype.onPropertyPaneFieldChanged = function (targetProperty, oldValue, newValue) {
            this.store.webpart.properties.set(targetProperty, newValue);
            return _super.prototype.onPropertyPaneFieldChanged.call(this, targetProperty, oldValue, newValue);
        };
        return class_2;
    }(Base));
}
exports.connectWebPartWithReactComponent = connectWebPartWithReactComponent;
function withPropertyPaneConfig(Base, propertyPaneConfig) {
    return /** @class */ (function (_super) {
        __extends(class_3, _super);
        function class_3() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._propertyPaneConfig = mobx_1.observable.map();
            return _this;
        }
        class_3.prototype.getPropertyPaneConfiguration = function () {
            var previousItems = _super.prototype.getPropertyPaneConfiguration.call(this);
            propertyPaneConfig.pages.forEach(function (page) {
                previousItems.pages.push(page);
            });
            return previousItems;
        };
        return class_3;
    }(Base));
}
exports.withPropertyPaneConfig = withPropertyPaneConfig;
//# sourceMappingURL=index.js.map