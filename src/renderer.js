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

console.log("un video mas mi gente");   

for (let i = 1; i <= diasEnELMes; i++) {
    const fila = tabla.insertRow();
    for(let j = 1; j <= 7; j++) {
        if (i === diaActual) {
            fila.insertCell().textContent = i;
            fila.insertCell().textContent = "Hoy";
        }
        else{
            fila.insertCell().textContent = i;
        }
    i++;
        if (i > diasEnELMes) {
            break;
        }
    }
}


