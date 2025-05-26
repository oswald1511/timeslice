const dayjs = require('dayjs');
const localeEs = require('dayjs/locale/es');  // Importa el idioma español

dayjs.locale(localeEs);

// Obtener la fecha actual formateada
const fechaActual = dayjs().format('dddd, DD MMMM YYYY');

// Mostrar la fecha en el párrafo
document.getElementById('fecha').textContent = `Hoy es: ${fechaActual}`;
const diasEnELMes = dayjs().daysInMonth();

const tabla = document.getElementById('calendario');

const diaActual = dayjs().date();
let fila = tabla.insertRow();

for (let i = 0; i < diasEnELMes; i++) {
    if (i % 7 === 0){
        fila = tabla.insertRow();
    }
    const celda = fila.insertCell();
    celda.textContent = i + 1;

    if (i + 1 === diaActual) {
        celda.style.backgroundColor = "lightblue"; // marcar el día actual    
    }
}



