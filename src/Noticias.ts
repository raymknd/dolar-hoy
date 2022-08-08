import "./html/css/main.scss";
import { Menu } from "./modules/Global/Menu";
import { Theme } from "./modules/Global/Theme";

const theme = new Theme();
theme.listen();


const menu = new Menu(document.getElementById("js--menu") as HTMLDivElement);
menu.listen();