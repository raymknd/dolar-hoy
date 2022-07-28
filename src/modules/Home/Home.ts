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
        // const l = this.d.getElementById("js--dolar-loader");
        try {
            const b = await DataAPI.getDolar(0);
            if (b?.dolar) return b.dolar as ResponseApiSingle;
        } catch (error) {
            
        }
    }
    getToday = () => {
        const today = getDate();
        const dateContainer = this.d.getElementById("js--actual-date") || false;
        if(dateContainer) dateContainer.innerHTML = `${today.day.name}, ${today.day.number} de ${today.month.name} del ${today.year}`;
    }
    getCurrency = async () => {
        const USD = await this.getDolar()
        // const DATE = window.localStorage.getItem("CURRENCY_DATA-DATE");
        const PARSED_USD = USD !== undefined ? parseInt(USD.serie.valor.toString()) : false;
    
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