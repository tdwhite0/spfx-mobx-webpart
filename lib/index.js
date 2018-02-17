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
function ObservableWebPart(Base) {
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
exports.ObservableWebPart = ObservableWebPart;
function ObservableWebPartWithReactComponent(Base, Component) {
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
            ReactDom.render(React.createElement(mobx_react_1.Provider, { stores: { webpart: this.store } },
                React.createElement(Component, null)), this.domElement);
        };
        class_2.prototype.onInit = function () {
            var _this = this;
            return _super.prototype.onInit.call(this).then(function () {
                _this.store.webpart.properties.clear();
                _this.store.webpart.properties.merge(_this.properties);
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
exports.ObservableWebPartWithReactComponent = ObservableWebPartWithReactComponent;
//# sourceMappingURL=index.js.map