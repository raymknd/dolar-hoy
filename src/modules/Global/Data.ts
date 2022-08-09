import { v4 as uuidv4 } from 'uuid';
export interface Query {
    from: string,
    to: string,
    amount: number;
}
export interface Info {
    timestamp: number,
    quote: number,
}

export interface ResponseApiSingle {
    success: boolean,
    query: Query,
    info: Info,
    result: number
}

export class DataAPI {
    dolar: ResponseApiSingle
    // dolarAntiguo: ResponseApiSingle

    constructor(dolarActual: ResponseApiSingle) {
        this.dolar = dolarActual;
    }
    static getDolar = async (quote?: string, amount: number = 1) => {
        try {
            const a = await fetch(`https://bffdolar.herokuapp.com/api/currency/get-data`)
            const json = await a.json();
            const dolar: ResponseApiSingle = json;
            return new DataAPI(dolar);
        } catch (error) {
            console.log(error);
            
        }
    }
}   