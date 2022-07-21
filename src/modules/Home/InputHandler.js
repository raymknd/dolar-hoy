"use strict";
exports.__esModule = true;
exports.InputHandler = exports.formatter = void 0;
function ClearInvalid(f, s) {
    if (f && s) {
        f.classList.remove("is-invalid");
        s.classList.remove("is-invalid");
    }
}
exports.formatter = new Intl.NumberFormat('es-CL');
function InputHandler(f, s, a, r) {
    var _a, _b;
    var x = ((_a = f.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) || undefined;
    var y = ((_b = s.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) || undefined;
    var value = a.escape(f.value);
    var target = s;
    if (value <= 0) {
        if (x)
            x.classList.add("is-invalid");
        target.value = "0";
    }
    else {
        ClearInvalid(x, y);
        var c = x === null || x === void 0 ? void 0 : x.dataset.currency;
        var d = y === null || y === void 0 ? void 0 : y.dataset.currency;
        if (!d || !c)
            throw new Error("No se especificaron las divisas en la raíz de la input. [B0]");
        c = c.toUpperCase().trim();
        d = d.toUpperCase().trim();
        var options = {
            currencies: {
                base: c,
                toBeConverted: d
            },
            value: value
        };
        var z = a.calculate(options, r || 2);
        target.value = exports.formatter.format(z);
    }
}
exports.InputHandler = InputHandler;
