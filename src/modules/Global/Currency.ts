/*

    Currency handler
    Development v0.0.0
    Documentación: https://docs.raymknd.cyou/dolar-currencyhandler

*/

import Big from 'big.js';

export interface Currencies {
    base: string,
    rates: {
        [currency: string]: number
    }
}

export interface ExchangeData {
    currencies: {
        base: string,
        toBeConverted: string
    },
    value: number
}

export default class Currency {
    private currencies: Currencies[];
    constructor(currencies?: Currencies[]) {
        if(currencies === undefined) throw new Error("No se indicaron las divisas. [X0]");
        this.currencies = currencies;
    }
    escape = (num: string) => {
        num = num.trim().replace(",", ".");
        const int: number = parseFloat(num) || 0;
        // console.log(int)
        return int;
    }
    calculate = (data?: ExchangeData, round?: number | boolean) => {
        if(data === undefined || round === undefined) throw new Error(`Faltan argumentos necesarios: ${data === undefined ? "data" : ""}${data === undefined && round === undefined ? ", " : ""}${round === undefined ? "floor" : "" }. [A0]`);
        const { base, toBeConverted } = data.currencies;
        if(base.toUpperCase() === toBeConverted.toUpperCase()) throw new Error("No se puede convertir la misma divisa. [A1]");
        const { value } = data;
        if(value === undefined || value <= 0) throw new Error("Valor de la base no definido o es igual o menor que 0. [A2]");
        const a = this.currencies.map((e) => {return e.base}).indexOf(base.toUpperCase());
        const rates = this.currencies[a];
        if(rates === undefined) throw new Error("La divisa especificada para la base no existe en las divisas especificadas. [A3]");
        const convertionValue = rates.rates[toBeConverted.toUpperCase()];
        if(convertionValue === undefined) throw new Error("La divisa especificada para ser convertida no existe en las divisas especificadas. [A4]");
        const x = new Big(convertionValue);
        const y = new Big(value);
        const exchangeRate = x.times(y);
        return round ? exchangeRate.round(typeof round === "number" ? round as number : 2).toNumber() : exchangeRate.toNumber();
    }
}
