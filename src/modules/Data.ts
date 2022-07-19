export default class DataAPI {
    getDolar = async () => {
        const a = await fetch('https://mindicador.cl/api/dolar');
        return await a.json();
    }
}