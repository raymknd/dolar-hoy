import Currency, { Currencies } from '../Global/Currency';
import {ResponseApiSingle, DataAPI} from "../Global/Data";
import { Toast } from '../Global/Toast';
import getDate from "./dateHandler";
import { formatter, InputHandler } from "./InputHandler";

type SupportedCurrencies = "USD" | "CLP";

export class Home {
    d:Document;
    toast: Toast;
    inputRoot: HTMLElement | null;
    constructor(document: Document) {
        this.d = document;
        this.toast = new Toast("#js--dolar-toast");
        this.inputRoot = this.d.getElementById("js--inputs-wrapper");
        
    }
    getDolar = async () => {
        try {
            const b = await DataAPI.getDolar('CLP')
            if (!b?.dolar.result) {
                return;
            }
            return b.dolar as ResponseApiSingle;
        } catch (error) {
            console.log(error);
        }
    }
    getToday = () => {
        const today = getDate();
        const dateContainer = this.d.getElementById("js--actual-date") || false;
        if(dateContainer) dateContainer.innerHTML = `${today.day.name}, ${today.day.number} de ${today.month.name} del ${today.year}`;
    }
    scrollTop = () => {
        window.scroll({
            behavior: "smooth",
            top: 0,
            left: 0
        });
    } 
    createCurrencyValue = (value: string | number, currency: string) => {
        const x = typeof value === "number" ? value.toString() : value;
        
        const a = this.d.createElement("div");
        a.className = "dolar-values_container";
        const b = this.d.createElement("div");
        b.className = "values-value";
        b.innerHTML = x;
        const c = this.d.createElement("div");
        c.className = "values-currency";
        c.innerHTML = currency.toUpperCase();
        a.appendChild(b);
        a.appendChild(c);
        return a;
    }
    createArrow = () => {
        const a = this.d.createElement("div");
        a.className = "dolar-values_swap";
        const b = this.d.createElement("span");
        b.className = "material-symbols-outlined";
        b.innerHTML = "&#xe5c8;";
        a.appendChild(b);
        return a;
    }
    createInput = (currency: SupportedCurrencies, inputId: string) => {
        // Root
        const a = this.d.createElement("div");
        a.className = "dolar-input_container";
        a.dataset.currency = currency.toUpperCase() === "CLP" ? "CLP" : "USD";
        // Currency icon
        const b = this.d.createElement("div");
        b.className = "dolar-input_currency-container";
        const c = this.d.createElement("img");
        c.src = currency.toUpperCase() === "CLP" ? "static/flag-chile.svg" : "static/flag-usa.svg";
        c.alt = currency.toUpperCase() === "CLP" ? "Chile" : "Usa"
        c.draggable = false;
        b.appendChild(c);
        // Input
        const d = this.d.createElement("div");
        d.className = "dolar-input_input-container";
        const e = this.d.createElement("input");
        e.type = "text";
        e.id = inputId;
        d.appendChild(e);
        // Currency code
        const f = this.d.createElement("div");
        f.className = "dolar-input_selected-currency-code";
        f.innerHTML = currency.toUpperCase() === "CLP" ? "CLP" : "USD"
        // Append and return
        a.appendChild(b);
        a.appendChild(d);
        a.appendChild(f);
        return a;
    }
    createSwap = () => {
        const a = this.d.createElement("div");
        a.className = "dolar-exchange_swap";
        const b = this.d.createElement("span");
        b.className = "material-symbols-outlined";
        b.innerHTML = "&#xe8d4;";
        a.appendChild(b);
        return a;
    }
    clearRoot = () => {
        if(this.inputRoot) this.inputRoot.innerHTML = "";
    }
    setInputs = (callback: (f: string, s: string) => void) => {
        const firstInput = "js--first-input";
        const secondInput = "js--second-input";
        if(this.inputRoot) {
            this.clearRoot();
            this.inputRoot.appendChild(this.createInput("USD", firstInput));
            this.inputRoot.appendChild(this.createSwap());
            this.inputRoot.appendChild(this.createInput("CLP", secondInput));
            callback(firstInput, secondInput);
        }
    }
    setCurrencyValues = (USD: string, CLP: string, root: string, callback?: () => void) => {
        const x = this.d.querySelector(root);
        if(x) {
            x.innerHTML = "";
            x.appendChild(this.createCurrencyValue(USD, "USD"));
            x.appendChild(this.createArrow());
            x.appendChild(this.createCurrencyValue(CLP, "CLP"));
            if(callback) callback();
        }
    }
    getCurrency = async () => {
        const USD = await this.getDolar();
        const PARSED_USD = USD?.info.quote || 0;
    
        if(!PARSED_USD) throw new Error("La divisa no está disponible.");
    
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
    
        const USD_CURRENT_VALUE = a.calculate({ currencies: { base: "USD", toBeConverted: "CLP" }, value: 1 }, 2).toString();

        this.setCurrencyValues("1", USD_CURRENT_VALUE, "#js--currency-value");

        this.setInputs((f, s) => {
            const firstInput = this.d.getElementById(f) as HTMLInputElement;
            const secondInput = this.d.getElementById(s) as HTMLInputElement;
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
        })
    }
}