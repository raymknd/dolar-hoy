"use strict";
exports.__esModule = true;
require("./html/css/main.scss");
var Menu_1 = require("./modules/Global/Menu");
var Theme_1 = require("./modules/Global/Theme");
var theme = new Theme_1.Theme();
theme.listen();
var menu = new Menu_1.Menu(document.getElementById("js--menu"));
menu.listen();
