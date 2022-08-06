"use strict";
exports.__esModule = true;
exports.Menu = void 0;
var Menu = /** @class */ (function () {
    function Menu(root) {
        var _this = this;
        this.listen = function () {
            if (_this.c && _this.o) {
                _this.c.addEventListener("click", function (e) {
                    e.preventDefault();
                    _this.close();
                });
                _this.o.addEventListener("click", function (e) {
                    e.preventDefault();
                    _this.open();
                });
            }
        };
        this.open = function () {
            return;
            _this.r.classList.add("is-open");
            _this.b.style.overflow = "hidden";
        };
        this.close = function () {
            _this.r.classList.remove("is-open");
            _this.b.removeAttribute("style");
        };
        this.r = root;
        this.d = document;
        this.b = this.d.body;
        this.c = this.d.querySelector('[data-menu="close"]');
        this.o = this.d.querySelector('[data-menu="open"]');
    }
    return Menu;
}());
exports.Menu = Menu;
