import "./html/css/main.scss";
import { Menu } from "./modules/Global/Menu";
import { Theme } from "./modules/Global/Theme";
import { Home } from "./modules/Home/Home";
import { Toast } from "./modules/Global/Toast";
import "scroll-behavior-polyfill";
import { Preload } from "./modules/Global/Preload";

const preload = new Preload();

const themeHandler = new Theme();
themeHandler.listen();

const menu = new Menu(document.getElementById("js--menu") as HTMLDivElement);
menu.listen();

const home = new Home(document);

const toast = new Toast("#js--dolar-toast");

const button = document.querySelector("#js--scroll-top") as HTMLButtonElement;
if(button) {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        home.scrollTop();
    })
}

if(window.matchMedia('(display-mode: standalone)').matches) {
    const x = document.querySelector("#js--web-or-app");
    document.body.classList.add("is-standalone")
    if(x) x.innerHTML = "esta app"
}

(async function() {
    try {
        home.getToday();
        await home.getDolar();
        await home.getCurrency();
        await preload.preload(["/static/flag-chile.svg", "/static/flag-usa.svg"]).then((u) => {
            console.log("Preloaded:", u)
        });
    } catch (error) {
        console.log(error)
        toast.error("Hubo un error, lamentamos las molestias, vuelve a intentar más tarde.", 3500);
    }
})();