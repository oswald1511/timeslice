const dayjs = require('dayjs');
const localeEs = require('dayjs/locale/es');  // Importa el idioma español

dayjs.locale(localeEs);

// Obtener la fecha actual formateada
const fechaActual = dayjs().format('dddd, DD MMMM YYYY');

// Mostrar la fecha en el párrafo
document.getElementById('fecha').textContent = `Hoy es: ${fechaActual}`;
