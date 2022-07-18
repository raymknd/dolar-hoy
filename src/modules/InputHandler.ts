import Currency from "./Currency";

function ClearInvalid(f?: HTMLElement, s?: HTMLElement) {
    if(f && s) {
        f.classList.remove("is-invalid");
        s.classList.remove("is-invalid");
    }
}

export var formatter = new Intl.NumberFormat('es-CL');

export function InputHandler(f: HTMLInputElement, s: HTMLInputElement, a: Currency, r?: number) {
    const x = f.parentElement?.parentElement || undefined;
    const y = s.parentElement?.parentElement || undefined;

    const value = a.escape(f.value);
    const target = s;

    if(value <= 0) {
        if(x) x.classList.add("is-invalid");
        target.value = "0";
    }
    else {
        ClearInvalid(x, y);

        var c = x?.dataset.currency;
        var d = y?.dataset.currency;

        if(!d || !c) throw new Error("No se especificaron las divisas en la raíz de la input. [B0]")

        c = c.toUpperCase().trim();
        d = d.toUpperCase().trim();

        const options = {
            currencies: {
                base: c as string,
                toBeConverted: d as string
            },
            value: value
        }

        const z = a.calculate(options, r || 2);

        target.value = formatter.format(z);
    }
}