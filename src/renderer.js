const dayjs = require('dayjs');
const localeEs = require('dayjs/locale/es');  // Importa el idioma español

dayjs.locale(localeEs);

const tabla = document.getElementById('calendario');
const fechaActual = document.getElementById('fechaCompleta');
fechaActual.textContent = dayjs().format('dddd, D [de] MMMM [de] YYYY');

let mesEnPantalla =  dayjs().month();
crearCalendario(mesEnPantalla);

let retrocederMes = document.getElementById('prev');
let avanzarMes = document.getElementById('next');

retrocederMes.onclick = function(){
    borrarCalendario();
    console.log(mesEnPantalla);
    mesEnPantalla--;
    crearCalendario(mesEnPantalla -1);
}

avanzarMes.onclick = function(){
    borrarCalendario();
    console.log(mesEnPantalla);
    mesEnPantalla++;
    crearCalendario(mesEnPantalla -1);

}

function borrarCalendario() {
    const tabla = document.getElementById('calendario');
    tabla.innerHTML = '';
}

function casillerosVaciosAntesDePrimerDia(mes){
    
    let  primerDiaDelMes = dayjs().month(mes).date(1).day();
    
    if (primerDiaDelMes === 0 ){
        primerDiaDelMes = 7;
    }
    
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
    return {fila, i};
}

function ponerDiasDelMes(mes, celdasDelMes, fila){
    
    const diaActual = dayjs().date();
    const mesActual = dayjs().month();
    const diasEnELMes = dayjs().month(mes).daysInMonth();
    tabla.appendChild(fila);
    
    for (let j = 0; j < diasEnELMes; j++) {
        if (celdasDelMes % 7 === 0){
            fila = document.createElement('div');
            fila.className = 'row';
            tabla.appendChild(fila);
        }
        const celda = document.createElement('div');
        celda.className = 'col celda-clickeable';
        celda.textContent = j + 1;
        
        if (j + 1 === diaActual && mes == mesActual) {
            celda.style.backgroundColor = '#697565'; // marcar el día actual    
        }
        fila.appendChild(celda);
        celdasDelMes++;
    }
    return {celdasDelMes,ultimaFila : fila} ;

}


function casillerosVaciosUltimaFila(celdasEnUltimaFila, ultimaFila){
    // Si la última fila no tiene 7 columnas, agrega celdas vacías
    celdasEnUltimaFila = celdasEnUltimaFila % 7;
    if (celdasEnUltimaFila !== 0) {
        for (let k = celdasEnUltimaFila; k < 7; k++) {
            const celdaVacia = document.createElement('div');
            celdaVacia.className = 'col';
            celdaVacia.innerHTML = '&nbsp;';
            ultimaFila.appendChild(celdaVacia);
        }
    }
}

function ponerMes(mes){
    let mesMostrado = dayjs().month(mes).format('MMMM');
    mesEnPantalla = dayjs().month(mes).format('M');
    document.getElementById('fecha').textContent = mesMostrado;
}

function crearCalendario(mes){
    ponerMes(mes);
    const { fila, i } = casillerosVaciosAntesDePrimerDia(mes);
    const { celdasDelMes, ultimaFila } = ponerDiasDelMes(mes, i, fila);
    casillerosVaciosUltimaFila(celdasDelMes, ultimaFila);
}
