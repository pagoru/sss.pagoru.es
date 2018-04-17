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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_copy_to_clipboard_1 = require("react-copy-to-clipboard");
var super_secret_settings_1 = require("super-secret-settings");
require("./index.less");
var qr_url = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=';
var qr_url2 = 'https://loremflickr.com/500/500?lock=';
var qr_static = 'https://instagram.fmad7-1.fna.fbcdn.net/vp/40e87239ca4b09b3d13fe05a553df631/5B65842E/t51.2885-15/e35/30602671_269685373571513_4681094377852895232_n.jpg';
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            secret: '',
            service: '',
            hash: '00000000',
            password: ''
        };
        _this.onChangeSecret = _this.onChangeSecret.bind(_this);
        _this.onChangeService = _this.onChangeService.bind(_this);
        return _this;
    }
    Application.prototype.onChangeSecret = function (event) {
        var secret = event.target.value;
        this.setState({
            secret: secret,
            hash: super_secret_settings_1.getHash(secret).substr(0, 8),
            password: super_secret_settings_1.getPassword(secret, this.state['service'])
        });
    };
    Application.prototype.onChangeService = function (event) {
        var service = event.target.value;
        this.setState({
            service: service,
            hash: super_secret_settings_1.getHash(this.state['secret']).substr(0, 8),
            password: super_secret_settings_1.getPassword(this.state['secret'], service)
        });
    };
    Application.prototype.render = function () {
        document.body.style.backgroundColor = "#" + this.state['hash'].substr(0, 6);
        return (React.createElement("div", { className: "robot" },
            React.createElement("div", { className: "inputs" },
                React.createElement("input", { id: "secret", placeholder: "secret", type: "password", onChange: this.onChangeSecret, autoFocus: true }),
                React.createElement("input", { id: "service", placeholder: "service", value: this.state['service'], onChange: this.onChangeService }),
                React.createElement("div", null),
                React.createElement("label", { id: "hexadecimalSeed", className: "noselect" }, this.state['hash'])),
            React.createElement(react_copy_to_clipboard_1.CopyToClipboard, { text: this.state['password'] },
                React.createElement("img", { id: "robotRock", src: qr_static }))));
    };
    return Application;
}(React.Component));
exports.default = Application;
//# sourceMappingURL=application.js.map