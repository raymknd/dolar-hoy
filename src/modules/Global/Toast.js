"use strict";
exports.__esModule = true;
exports.Toast = void 0;
var Toast = /** @class */ (function () {
    function Toast(root) {
        var _this = this;
        this.open = function (msg, severity, autoClose) {
            if (_this.root && _this.inner) {
                _this.severities.map(function (s) {
                    var _a, _b, _c, _d;
                    if (s.severity === severity) {
                        var i = _this.d.createElement("div");
                        i.className = "dolar-toast_icon";
                        var mi = _this.d.createElement("span");
                        mi.className = "material-symbols-outlined";
                        mi.innerHTML = s.icon;
                        i.appendChild(mi);
                        var m = _this.d.createElement("div");
                        m.className = "dolar-toast_message";
                        m.innerHTML = msg;
                        (_a = _this.inner) === null || _a === void 0 ? void 0 : _a.appendChild(i);
                        (_b = _this.inner) === null || _b === void 0 ? void 0 : _b.appendChild(m);
                        (_c = _this.root) === null || _c === void 0 ? void 0 : _c.classList.add("is-".concat(s.severity));
                        (_d = _this.root) === null || _d === void 0 ? void 0 : _d.classList.add("is-open");
                        if (autoClose) {
                            var time = typeof autoClose === "number" ? autoClose : 1500;
                            setTimeout(function () {
                                _this.close();
                            }, time);
                        }
                    }
                });
            }
        };
        this.close = function () {
            return new Promise(function (res, rej) {
                if (_this.root) {
                    _this.root.classList.remove("is-open");
                    _this.root.addEventListener("transitionend", function () {
                        var _a;
                        if (!((_a = _this.root) === null || _a === void 0 ? void 0 : _a.classList.contains("is-open"))) {
                            _this.severities.forEach(function (s) {
                                if (_this.root)
                                    _this.root.classList.remove("is-".concat(s.severity));
                            });
                            if (_this.inner)
                                _this.inner.innerHTML = "";
                            res(true);
                        }
                    });
                }
            });
        };
        this.error = function (msg, autoClose) {
            _this.open(msg, "error", autoClose);
        };
        this.success = function (msg, autoClose) {
            _this.open(msg, "success", autoClose);
        };
        this.warning = function (msg, autoClose) {
            _this.open(msg, "warning", autoClose);
        };
        this.info = function (msg, autoClose) {
            _this.open(msg, "info", autoClose);
        };
        this.d = document;
        this.b = this.d.body;
        this.root = this.d.querySelector(root);
        this.inner = this.root ? this.root.querySelector("div.dolar-toast_inner") : null;
        this.severities = [
            { severity: "error", icon: "error" },
            { severity: "warning", icon: "warning" },
            { severity: "success", icon: "check_circle" },
            { severity: "info", icon: "info" }
        ];
    }
    return Toast;
}());
exports.Toast = Toast;
