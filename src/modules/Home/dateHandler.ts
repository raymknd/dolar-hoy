export default function getDate() {
    const months: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const days: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const d = new Date();

    interface Date {
        day: {
            number: number,
            name: string
        },
        month: {
            number: number,
            name: string
        },
        year: number
    }

    const date: Date = {
        day: {
            number: d.getDate(),
            name: days[d.getDay()]
        },
        month: {
            number: d.getMonth(),
            name: months[d.getMonth()]
        },
        year: d.getFullYear()

    }

    return date;

}
