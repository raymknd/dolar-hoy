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
var dateHandler_1 = require("./dateHandler");
var InputHandler_1 = require("./InputHandler");
var Home = /** @class */ (function () {
    function Home(document) {
        var _this = this;
        this.getDolar = function () { return __awaiter(_this, void 0, void 0, function () {
            var l, b, dolar, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        l = this.d.getElementById("js--dolar-loader");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Data_1.DataAPI.getDolar(0)];
                    case 2:
                        b = _a.sent();
                        dolar = b.dolar;
                        window.localStorage.setItem("CURRENCY_DATA-USD", dolar.serie.valor.toString());
                        window.localStorage.setItem("CURRENCY_DATA-DATE", dolar.serie.fecha.toString());
                        this.d.body.classList.add("data-fetched");
                        if (l) {
                            l.addEventListener("transitionend", function () {
                                if (_this.d.body.classList.contains("data-fetched"))
                                    l.remove();
                                _this.d.body.removeAttribute("style");
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        this.d.body.classList.add("data-fetched");
                        this.d.body.innerHTML += '<div class="dolar-error" id="js--dolar-error"> <div> <div class="dolar-error_icon"> <span class="material-symbols-outlined"> error </span> </div> <div class="dolar-error_title">Hubo un error</div> <div class="dolar-error_tryagain">Puedes volver a intentar más tarde, lamentamos las molestias.</div> </div> </div>';
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getToday = function () {
            var today = (0, dateHandler_1["default"])();
            var dateContainer = _this.d.getElementById("js--actual-date") || false;
            if (dateContainer)
                dateContainer.innerHTML = "".concat(today.day.name, ", ").concat(today.day.number, " de ").concat(today.month.name, " del ").concat(today.year);
        };
        this.getCurrency = function () {
            var USD = window.localStorage.getItem("CURRENCY_DATA-USD");
            // const DATE = window.localStorage.getItem("CURRENCY_DATA-DATE");
            var PARSED_USD = USD !== null ? parseInt(USD) : false;
            if (!PARSED_USD)
                throw new Error("No se encontró el valor de la divisa en el storage o era invalida. [C0]");
            var options = [
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
            var a = new Currency_1["default"](options);
            var cv = _this.d.getElementById("js--clp-current-value");
            if (cv) {
                cv.innerHTML = a.calculate({
                    currencies: {
                        base: "USD",
                        toBeConverted: "CLP"
                    },
                    value: 1
                }, false).toString();
            }
            var firstInput = _this.d.getElementById("js--first-input");
            var secondInput = _this.d.getElementById("js--second-input");
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
        };
        this.d = document;
    }
    return Home;
}());
exports.Home = Home;
