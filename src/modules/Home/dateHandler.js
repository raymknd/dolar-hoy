"use strict";
exports.__esModule = true;
function getDate() {
    var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    var d = new Date();
    var date = {
        day: {
            number: d.getDate(),
            name: days[d.getDay()]
        },
        month: {
            number: d.getMonth(),
            name: months[d.getMonth()]
        },
        year: d.getFullYear()
    };
    return date;
}
exports["default"] = getDate;
