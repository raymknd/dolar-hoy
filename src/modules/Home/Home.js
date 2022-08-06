"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Home = void 0;
var Currency_1 = require("../Global/Currency");
var Data_1 = require("../Global/Data");
var Toast_1 = require("../Global/Toast");
var dateHandler_1 = require("./dateHandler");
var InputHandler_1 = require("./InputHandler");
var Home = /** @class */ (function () {
    function Home(document) {
        var _this = this;
        this.getDolar = function () { return __awaiter(_this, void 0, void 0, function () {
            var b, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Data_1.DataAPI.getDolar('CLP')];
                    case 1:
                        b = _a.sent();
                        if (!(b === null || b === void 0 ? void 0 : b.dolar.result)) {
                            return [2 /*return*/];
                        }
                        console.log(b === null || b === void 0 ? void 0 : b.dolar.success);
                        return [2 /*return*/, b.dolar];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getToday = function () {
            var today = (0, dateHandler_1["default"])();
            var dateContainer = _this.d.getElementById("js--actual-date") || false;
            if (dateContainer)
                dateContainer.innerHTML = "".concat(today.day.name, ", ").concat(today.day.number, " de ").concat(today.month.name, " del ").concat(today.year);
        };
        this.scrollTop = function () {
            window.scroll({
                behavior: "smooth",
                top: 0,
                left: 0
            });
        };
        this.createCurrencyValue = function (value, currency) {
            var x = typeof value === "number" ? value.toString() : value;
            var a = _this.d.createElement("div");
            a.className = "dolar-values_container";
            var b = _this.d.createElement("div");
            b.className = "values-value";
            b.innerHTML = x;
            var c = _this.d.createElement("div");
            c.className = "values-currency";
            c.innerHTML = currency.toUpperCase();
            a.appendChild(b);
            a.appendChild(c);
            return a;
        };
        this.createArrow = function () {
            var a = _this.d.createElement("div");
            a.className = "dolar-values_swap";
            var b = _this.d.createElement("span");
            b.className = "material-symbols-outlined";
            b.innerHTML = "arrow_forward";
            a.appendChild(b);
            return a;
        };
        this.createInput = function (currency, inputId) {
            // Root
            var a = _this.d.createElement("div");
            a.className = "dolar-input_container";
            a.dataset.currency = currency.toUpperCase() === "CLP" ? "CLP" : "USD";
            // Currency icon
            var b = _this.d.createElement("div");
            b.className = "dolar-input_currency-container";
            var c = _this.d.createElement("img");
            c.src = currency.toUpperCase() === "CLP" ? "static/flag-chile.svg" : "static/flag-usa.svg";
            c.alt = currency.toUpperCase() === "CLP" ? "Chile" : "Usa";
            c.draggable = false;
            b.appendChild(c);
            // Input
            var d = _this.d.createElement("div");
            d.className = "dolar-input_input-container";
            var e = _this.d.createElement("input");
            e.type = "text";
            e.id = inputId;
            d.appendChild(e);
            // Currency code
            var f = _this.d.createElement("div");
            f.className = "dolar-input_selected-currency-code";
            f.innerHTML = currency.toUpperCase() === "CLP" ? "CLP" : "USD";
            // Append and return
            a.appendChild(b);
            a.appendChild(d);
            a.appendChild(f);
            return a;
        };
        this.createSwap = function () {
            var a = _this.d.createElement("div");
            a.className = "dolar-exchange_swap";
            var b = _this.d.createElement("span");
            b.className = "material-symbols-outlined";
            b.innerHTML = "swap_horiz";
            a.appendChild(b);
            return a;
        };
        this.clearRoot = function () {
            if (_this.inputRoot)
                _this.inputRoot.innerHTML = "";
        };
        this.setInputs = function (callback) {
            var firstInput = "js--first-input";
            var secondInput = "js--second-input";
            if (_this.inputRoot) {
                _this.clearRoot();
                _this.inputRoot.appendChild(_this.createInput("USD", firstInput));
                _this.inputRoot.appendChild(_this.createSwap());
                _this.inputRoot.appendChild(_this.createInput("CLP", secondInput));
                callback(firstInput, secondInput);
            }
        };
        this.setCurrencyValues = function (USD, CLP, root, callback) {
            var x = _this.d.querySelector(root);
            if (x) {
                x.innerHTML = "";
                x.appendChild(_this.createCurrencyValue(USD, "USD"));
                x.appendChild(_this.createArrow());
                x.appendChild(_this.createCurrencyValue(CLP, "CLP"));
                if (callback)
                    callback();
            }
        };
        this.getCurrency = function () { return __awaiter(_this, void 0, void 0, function () {
            var USD, PARSED_USD, options, a, USD_CURRENT_VALUE;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDolar()];
                    case 1:
                        USD = _a.sent();
                        PARSED_USD = (USD === null || USD === void 0 ? void 0 : USD.info.quote) || 0;
                        if (!PARSED_USD)
                            throw new Error("La divisa no está disponible.");
                        options = [
                            {
                                base: "USD",
                                rates: {
                                    CLP: PARSED_USD
                                }
                            },
                            {
                                base: "CLP",
                                rates: {
                                    USD: 1 / PARSED_USD
                                }
                            }
                        ];
                        a = new Currency_1["default"](options);
                        USD_CURRENT_VALUE = a.calculate({ currencies: { base: "USD", toBeConverted: "CLP" }, value: 1 }, 2).toString();
                        this.setCurrencyValues("1", USD_CURRENT_VALUE, "#js--currency-value");
                        this.setInputs(function (f, s) {
                            var firstInput = _this.d.getElementById(f);
                            var secondInput = _this.d.getElementById(s);
                            console.log(PARSED_USD);
                            // setTimeout(() => {
                            //     this.toast.info(formatter.format(PARSED_USD), 2000)
                            // }, 1000);
                            if (firstInput && secondInput) {
                                firstInput.value = "1";
                                secondInput.value = InputHandler_1.formatter.format(PARSED_USD);
                                firstInput.addEventListener("input", function () {
                                    (0, InputHandler_1.InputHandler)(firstInput, secondInput, a);
                                });
                                secondInput.addEventListener("input", function () {
                                    (0, InputHandler_1.InputHandler)(secondInput, firstInput, a, 0);
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.d = document;
        this.toast = new Toast_1.Toast("#js--dolar-toast");
        this.inputRoot = this.d.getElementById("js--inputs-wrapper");
    }
    return Home;
}());
exports.Home = Home;
