"use strict";
exports.__esModule = true;
exports.Theme = void 0;
var Theme = /** @class */ (function () {
    function Theme() {
        var _this = this;
        this.listen = function () {
            if (_this.mdt.matches)
                _this.setDarkMode();
            _this.mdt.addEventListener("change", function () {
                var isDark = _this.mdt.matches ? true : false;
                if (isDark)
                    _this.setDarkMode();
                else
                    _this.removeDarkMode();
            });
            if (_this.button) {
                var icon_1 = _this.button.querySelector("span");
                _this.button.addEventListener("click", function (e) {
                    e.preventDefault();
                    if (_this.IsDark()) {
                        _this.removeDarkMode();
                        if (icon_1)
                            icon_1.innerHTML = "dark_mode";
                    }
                    else {
                        _this.setDarkMode();
                        if (icon_1)
                            icon_1.innerHTML = "light_mode";
                    }
                });
            }
        };
        this.setDarkMode = function () {
            if (!_this.IsDark())
                _this.b.classList.add("dark-mode");
        };
        this.removeDarkMode = function () {
            if (_this.IsDark())
                _this.b.classList.remove("dark-mode");
        };
        this.IsDark = function () {
            var isDark = _this.b.classList.contains("dark-mode");
            return isDark ? true : false;
        };
        this.d = document;
        this.w = window;
        this.b = this.d.body;
        this.mdt = this.w.matchMedia('(prefers-color-scheme: dark)');
        this.button = this.d.querySelector('[data-settheme]');
    }
    return Theme;
}());
exports.Theme = Theme;
