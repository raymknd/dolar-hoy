import Currency, { Currencies } from '../Global/Currency';
import {ResponseApiSingle, DataAPI} from "../Global/Data";
import getDate from "./dateHandler";
import { formatter, InputHandler } from "./InputHandler";
export class Home {
    d:Document;
    constructor(document: Document) {
        this.d = document;
    }
    getDolar = async () => {
        const l = this.d.getElementById("js--dolar-loader");
        try {
            const b = await DataAPI.getDolar(0)
            const dolar = b.dolar as ResponseApiSingle;
            window.localStorage.setItem("CURRENCY_DATA-USD", dolar.serie.valor.toString());
            window.localStorage.setItem("CURRENCY_DATA-DATE", dolar.serie.fecha.toString());
            this.d.body.classList.add("data-fetched");
            if (l) {
                l.addEventListener("transitionend", () => {
                    if (this.d.body.classList.contains("data-fetched")) l.remove();
                    this.d.body.removeAttribute("style");
                })
            }
        } catch (error) {
            console.log(error);
            this.d.body.classList.add("data-fetched");
            this.d.body.innerHTML += '<div class="dolar-error" id="js--dolar-error"> <div> <div class="dolar-error_icon"> <span class="material-symbols-outlined"> error </span> </div> <div class="dolar-error_title">Hubo un error</div> <div class="dolar-error_tryagain">Puedes volver a intentar más tarde, lamentamos las molestias.</div> </div> </div>';
        }
    }
    getToday = () => {
        const today = getDate();
        const dateContainer = this.d.getElementById("js--actual-date") || false;
        if(dateContainer) dateContainer.innerHTML = `${today.day.name}, ${today.day.number} de ${today.month.name} del ${today.year}`;
    }
    getCurrency = () => {
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
    
        const cv = this.d.getElementById("js--clp-current-value");
        if(cv) {
            cv.innerHTML = a.calculate({
                currencies: {
                    base: "USD",
                    toBeConverted: "CLP"
                },
                value: 1
            }, false).toString();
        }
        const firstInput = this.d.getElementById("js--first-input") as HTMLInputElement;
        const secondInput = this.d.getElementById("js--second-input") as HTMLInputElement;
        
        if(firstInput && secondInput) {
            firstInput.value = "1";
            secondInput.value = formatter.format(PARSED_USD);
            firstInput.addEventListener("input", () => {
                InputHandler(firstInput, secondInput, a);
            });
            secondInput.addEventListener("input", () => {
                InputHandler(secondInput, firstInput, a, 0);
            })
        }
    }
}