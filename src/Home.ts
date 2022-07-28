import "./html/css/main.scss";
import { Menu } from "./modules/Global/Menu";
import { Theme } from "./modules/Global/Theme";
import { Home } from "./modules/Home/Home";

const themeHandler = new Theme();
themeHandler.listen();

const menu = new Menu(document.getElementById("js--menu") as HTMLDivElement);
menu.listen();

const home = new Home(document); 

(async function() {
    home.getToday();
    home.getDolar();
    home.getCurrency();
})();