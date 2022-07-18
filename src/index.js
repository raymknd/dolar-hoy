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
var dateHandler_1 = require("./modules/dateHandler");
var Currency_1 = require("./modules/Currency");
var InputHandler_1 = require("./modules/InputHandler");
var today = (0, dateHandler_1["default"])();
var dateContainer = document.getElementById("js--actual-date") || false;
if (dateContainer)
    dateContainer.innerHTML = "".concat(today.day.name, ", ").concat(today.day.number, " de ").concat(today.month.name, " del ").concat(today.year);
var firstInput = document.getElementById("js--first-input");
var secondInput = document.getElementById("js--second-input");
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var l, a_1, b, _a, _b, _c, _d, _e, _f, error_1, USD, PARSED_USD, options, a;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    l = document.getElementById("js--dolar-loader");
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("https://mindicador.cl/api/dolar")];
                case 2:
                    a_1 = _g.sent();
                    return [4 /*yield*/, a_1.json()];
                case 3:
                    b = _g.sent();
                    _b = (_a = window.localStorage).setItem;
                    _c = ["CURRENCY_DATA-USD"];
                    return [4 /*yield*/, b];
                case 4:
                    _b.apply(_a, _c.concat([(_g.sent()).serie[0].valor.toString()]));
                    _e = (_d = window.localStorage).setItem;
                    _f = ["CURRENCY_DATA-DATE"];
                    return [4 /*yield*/, b];
                case 5:
                    _e.apply(_d, _f.concat([(_g.sent()).serie[0].fecha]));
                    document.body.classList.add("data-fetched");
                    if (l) {
                        l.addEventListener("transitionend", function () {
                            if (document.body.classList.contains("data-fetched"))
                                l.remove();
                            document.body.removeAttribute("style");
                        });
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _g.sent();
                    console.log(error_1);
                    document.body.classList.add("data-fetched");
                    document.body.innerHTML += '<div class="dolar-error" id="js--dolar-error"> <div> <div class="dolar-error_icon"> <span class="material-symbols-outlined"> error </span> </div> <div class="dolar-error_title">Hubo un error</div> <div class="dolar-error_tryagain">Puedes volver a intentar más tarde, lamentamos las molestias.</div> </div> </div>';
                    return [3 /*break*/, 7];
                case 7:
                    USD = window.localStorage.getItem("CURRENCY_DATA-USD");
                    PARSED_USD = USD !== null ? parseInt(USD) : false;
                    if (!PARSED_USD)
                        throw new Error("No se encontró el valor de la divisa en el storage o era invalida. [C0]");
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
                    if (firstInput && secondInput) {
                        firstInput.value = InputHandler_1.formatter.format(PARSED_USD);
                        secondInput.value = "1";
                        firstInput.addEventListener("input", function () {
                            (0, InputHandler_1.InputHandler)(firstInput, secondInput, a);
                        });
                        secondInput.addEventListener("input", function () {
                            (0, InputHandler_1.InputHandler)(secondInput, firstInput, a, 0);
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
})();
