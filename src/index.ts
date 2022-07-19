import getDate from "./modules/dateHandler";
import Currency, { Currencies } from "./modules/Currency";
import { formatter, InputHandler } from "./modules/InputHandler";
import DataAPI from "./modules/Data";

(function() {
    const x = document.getElementById("js--toggle-theme") || false;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add("dark-mode");
    }
    if(x) {
        const icon = x.querySelector("span");
        x.addEventListener("click", (e) => {
            e.preventDefault();
            if(document.body.classList.contains("dark-mode")) {
                document.body.classList.remove("dark-mode");
                if(icon) icon.innerHTML = "dark_mode";
            }
            else {
                document.body.classList.add("dark-mode");
                if(icon) icon.innerHTML = "light_mode";
            }
        })
    }
})();

const today = getDate();
const api = new DataAPI();
const dateContainer = document.getElementById("js--actual-date") || false;
if(dateContainer) dateContainer.innerHTML = `${today.day.name}, ${today.day.number} de ${today.month.name} del ${today.year}`;

const firstInput = document.getElementById("js--first-input") as HTMLInputElement;
const secondInput = document.getElementById("js--second-input") as HTMLInputElement;

(async function() {
    interface x {
        fecha: string,
        valor: number
    }
    interface y {
        serie: x[]
    }

    const l = document.getElementById("js--dolar-loader");

    try {
        // const a = await fetch("https://mindicador.cl/api/dolar");
        // const b: Promise<y> = await a.json();
        const b = api.getDolar();
        window.localStorage.setItem("CURRENCY_DATA-USD", (await b).serie[0].valor.toString());
        window.localStorage.setItem("CURRENCY_DATA-DATE", (await b).serie[0].fecha);
        document.body.classList.add("data-fetched");
        if(l) {
            l.addEventListener("transitionend", () => {
                if(document.body.classList.contains("data-fetched")) l.remove();
                document.body.removeAttribute("style");
            })
        }
    } catch (error) {
        console.log(error);
        document.body.classList.add("data-fetched");
        document.body.innerHTML += '<div class="dolar-error" id="js--dolar-error"> <div> <div class="dolar-error_icon"> <span class="material-symbols-outlined"> error </span> </div> <div class="dolar-error_title">Hubo un error</div> <div class="dolar-error_tryagain">Puedes volver a intentar más tarde, lamentamos las molestias.</div> </div> </div>';
        // document.body.classList.add("data-fetched");
        // document.getElementById("js--dolar-loader")?.addEventListener("transitionend", () => {
        //     if(document.body.classList.contains("data-fetched")) {
        //         console.log(error);
        //     }
        // })
    }

    const USD = window.localStorage.getItem("CURRENCY_DATA-USD");
    // const DATE = window.localStorage.getItem("CURRENCY_DATA-DATE");
    const PARSED_USD = USD !== null ? parseInt(USD) : false;

    if(!PARSED_USD) throw new Error("No se encontró el valor de la divisa en el storage o era invalida. [C0]");

    const options: Currencies[] = [
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
    ]

    const a = new Currency(options);

    const cv = document.getElementById("js--clp-current-value");
    if(cv) {
        cv.innerHTML = a.calculate({
            currencies: {
                base: "USD",
                toBeConverted: "CLP"
            },
            value: 1
        }, false).toString();
    }

    if(firstInput && secondInput) {
        firstInput.value = formatter.format(PARSED_USD);
        secondInput.value = "1";
        firstInput.addEventListener("input", () => {
            InputHandler(firstInput, secondInput, a);
        });
        secondInput.addEventListener("input", () => {
            InputHandler(secondInput, firstInput, a, 0);
        })
    }
})();