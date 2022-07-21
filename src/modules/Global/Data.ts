export interface ResponseApi {
    codigo: string,
    serie: [ResponseApiSerie]
}
export interface ResponseApiSingle {
    codigo: string,
    serie: ResponseApiSerie
}

export interface ResponseApiSerie {
    fecha: Date,
    valor: number
}

export class DataAPI {
    dolar: ResponseApi | ResponseApiSingle
    constructor(dolarActual:ResponseApi | ResponseApiSingle ) {
        this.dolar = dolarActual;
    }
    static getDolar = async (indice?:number) => {
        const a = await fetch('https://mindicador.cl/api/dolar');
        const json = await a.json();
        let newDolar:ResponseApiSingle = {} as ResponseApiSingle;
        const dolar:ResponseApi = json;
        if (typeof indice !== 'undefined') {
            newDolar.codigo = dolar.codigo;
            newDolar.serie = {} as ResponseApiSerie
            newDolar.serie = dolar.serie.filter((x,i) => i == indice )[0];
            return new DataAPI(newDolar)
        }
        return new DataAPI(dolar);
    }
}