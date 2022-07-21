"use strict";
/*

    Currency handler
    Development v0.0.0
    Documentación: https://docs.raymknd.cyou/dolar-currencyhandler

*/
exports.__esModule = true;
var big_js_1 = require("big.js");
var Currency = /** @class */ (function () {
    function Currency(currencies) {
        var _this = this;
        this.escape = function (num) {
            num = num.trim().replace(",", ".");
            var int = parseFloat(num) || 0;
            // console.log(int)
            return int;
        };
        this.calculate = function (data, round) {
            if (data === undefined || round === undefined)
                throw new Error("Faltan argumentos necesarios: ".concat(data === undefined ? "data" : "").concat(data === undefined && round === undefined ? ", " : "").concat(round === undefined ? "floor" : "", ". [A0]"));
            var _a = data.currencies, base = _a.base, toBeConverted = _a.toBeConverted;
            if (base.toUpperCase() === toBeConverted.toUpperCase())
                throw new Error("No se puede convertir la misma divisa. [A1]");
            var value = data.value;
            if (value === undefined || value <= 0)
                throw new Error("Valor de la base no definido o es igual o menor que 0. [A2]");
            var a = _this.currencies.map(function (e) { return e.base; }).indexOf(base.toUpperCase());
            var rates = _this.currencies[a];
            if (rates === undefined)
                throw new Error("La divisa especificada para la base no existe en las divisas especificadas. [A3]");
            var convertionValue = rates.rates[toBeConverted.toUpperCase()];
            if (convertionValue === undefined)
                throw new Error("La divisa especificada para ser convertida no existe en las divisas especificadas. [A4]");
            var x = new big_js_1["default"](convertionValue);
            var y = new big_js_1["default"](value);
            var exchangeRate = x.times(y);
            return round ? exchangeRate.round(typeof round === "number" ? round : 2).toNumber() : exchangeRate.toNumber();
        };
        if (currencies === undefined)
            throw new Error("No se indicaron las divisas. [X0]");
        this.currencies = currencies;
    }
    return Currency;
}());
exports["default"] = Currency;
