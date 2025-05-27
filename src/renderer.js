const dayjs = require('dayjs');
const localeEs = require('dayjs/locale/es');  // Importa el idioma español

dayjs.locale(localeEs);

// Obtener la fecha actual formateada
const mesActual = dayjs().format('MMMM');

// Mostrar la fecha en el párrafo
document.getElementById('fecha').textContent = mesActual;

const tabla = document.getElementById('calendario');

const diaActual = dayjs().date();

const  primerDiaDelMes = (dayjs().startOf('month').day()) % 7;

let fila = document.createElement('div');
fila.className = 'row';

let i = 0;
while(i + 1 < primerDiaDelMes){
    const celda = document.createElement('div');
    celda.className = 'col';
    celda.innerHTML = '&nbsp;';
    fila.appendChild(celda);
    i++;
}

const diasEnELMes = dayjs().daysInMonth();

tabla.appendChild(fila);

for (let j = 0; j < diasEnELMes; j++) {
    if (i % 7 === 0){
        fila = document.createElement('div');
        fila.className = 'row';
        tabla.appendChild(fila);
    }
    const celda = document.createElement('div');
    celda.className = 'col';
    celda.textContent = j + 1;

    if (j + 1 === diaActual) {
        celda.style.backgroundColor = "lightblue"; // marcar el día actual    
    }
    fila.appendChild(celda);
    i++;
}

// Si la última fila no tiene 7 columnas, agrega celdas vacías
const celdasEnUltimaFila = i % 7;
if (celdasEnUltimaFila !== 0) {
    for (let k = celdasEnUltimaFila; k < 7; k++) {
        const celdaVacia = document.createElement('div');
        celdaVacia.className = 'col';
        celdaVacia.innerHTML = '&nbsp;';
        fila.appendChild(celdaVacia);
    }
}






