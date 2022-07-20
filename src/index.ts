import "./html/css/main.scss";
import { Theme } from "./modules/Theme";

const theme = new Theme(document);
theme.changeTheme();
(async function() {
    theme.getToday();
    theme.getDolar();
    theme.getCurrency();
})();