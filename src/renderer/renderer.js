dayjs.locale('es');

const tabla = document.getElementById('calendario');
const fechaActual = document.getElementById('fechaCompleta');
fechaActual.textContent = dayjs().format('dddd, D [de] MMMM [de] YYYY');

let mesEnPantalla =  dayjs().month();
let anioEnPantalla = dayjs().year();
crearCalendario(mesEnPantalla, anioEnPantalla);

let fechaSeleccionada;

let retrocederMes = document.getElementById('prev-mes');
let avanzarMes = document.getElementById('next-mes');

let retrocederAnio = document.getElementById('prev-anio');
let avanzarAnio = document.getElementById('next-anio');

const contenedorCentral = document.getElementById('contenedorCentral');
const sidebar = document.getElementById('sidebar');
let sidebarContent = document.getElementById('sidebar-content');
const closeSidebar = document.getElementById('closeSidebar');

closeSidebar.addEventListener('click', function() {
    sidebar.classList.remove('active');
    contenedorCentral.style.transform = '';
});

document.addEventListener('click', function(event) {
    if (sidebar.classList.contains('active') && !sidebar.contains(event.target)) {
        sidebar.classList.remove('active');
        contenedorCentral.style.transform = '';
    }
});

retrocederAnio.onclick = function(){
    borrarCalendario();
    anioEnPantalla--;
    crearCalendario(mesEnPantalla, anioEnPantalla);
}

avanzarAnio.onclick = function(){
    borrarCalendario();
    anioEnPantalla++;
    crearCalendario(mesEnPantalla, anioEnPantalla);
}

retrocederMes.onclick = function(){
    borrarCalendario();
    mesEnPantalla--;
    if(mesEnPantalla < 0){
        mesEnPantalla = 11;
        anioEnPantalla--;
    }
    crearCalendario(mesEnPantalla, anioEnPantalla);
}

avanzarMes.onclick = function(){
    borrarCalendario();
    mesEnPantalla++;
    if(mesEnPantalla === 12){
        mesEnPantalla = 0;
        anioEnPantalla++;
    }
    crearCalendario(mesEnPantalla, anioEnPantalla);
}

function borrarCalendario() {
    const tabla = document.getElementById('calendario');
    tabla.innerHTML = '';
}

function casillerosVaciosAntesDePrimerDia(mes, anio){
    
    let  primerDiaDelMes = dayjs().year(anio).month(mes).date(1).day();
    
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

async function ponerDiasDelMes(mes, anio, celdasDelMes, fila){
    const diaActual = dayjs().date();
    const mesActual = dayjs().month();
    const anioActual = dayjs().year();
    const diasEnELMes = dayjs().year(anio).month(mes).daysInMonth();
    tabla.appendChild(fila);
    
    for (let j = 0; j < diasEnELMes; j++) {
        if (celdasDelMes % 7 === 0){
            fila = document.createElement('div');
            fila.className = 'row';
            tabla.appendChild(fila);
        }
        const celda = document.createElement('div');
        celda.className = 'col tocable';
        celda.textContent = j + 1;

        const fecha = dayjs().year(anio).month(mes).date(j + 1).format('DD-MM-YYYY');
        const evento = await window.electronAPI.getEvent({ fecha });

        if (evento && evento.color) {
            const circulo = document.createElement('span');
            circulo.className = 'circulo'
            circulo.style.backgroundColor = evento.color;
            celda.appendChild(circulo);
        }

        celda.addEventListener('click', function(event) {
            event.stopPropagation(); 
            fechaSeleccionada = dayjs().year(anio).month(mes).date(j + 1).format('DD-MM-YYYY');
            sidebarContent.innerHTML = `<h2>${j + 1}</h2>`;
            sidebar.classList.add('active');
            contenedorCentral.style.transform = 'translateX(6%)';
            ponerContenidoEvento();
        });

        if (j + 1 === diaActual && mes == mesActual && anio == anioActual) {
            celda.style.backgroundColor = '#697565'; // marca el día actual    
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

function ponerAnio(anio){
    anioEnPantalla = anio;
    document.getElementById('anioMostrado').textContent = anioEnPantalla;
}

function ponerMes(mes){
    let mesMostrado = dayjs().month(mes).format('MMMM');
    mesEnPantalla = mes
    document.getElementById('mesMostrado').textContent = mesMostrado;
}

async function crearCalendario(mes, anio){
    ponerAnio(anio);
    ponerMes(mes);
    const { fila, i } = casillerosVaciosAntesDePrimerDia(mes, anio);
    const { celdasDelMes, ultimaFila } = await ponerDiasDelMes(mes, anio, i, fila);
    casillerosVaciosUltimaFila(celdasDelMes, ultimaFila);
}

const guardarBtn = document.getElementById('guardarTitulo');

function mostrarBotonGuardar() {
    const titulo = document.getElementById('titulo-evento').value.trim();
    const descripcion = document.getElementById('descripcion-evento').value.trim();
    const color = document.getElementById('color-evento').value;
    const hayCambios =
        (titulo !== (tituloOriginal || '').trim()) ||
        (descripcion !== (descripcionOriginal || '').trim()) ||
        (color !== (colorOriginal || '#000000'));
    guardarBtn.style.display = hayCambios ? 'block' : 'none';
}
document.getElementById('color-evento').addEventListener('input', mostrarBotonGuardar);
document.getElementById('titulo-evento').addEventListener('input', mostrarBotonGuardar);
document.getElementById('descripcion-evento').addEventListener('input', mostrarBotonGuardar);
guardarBtn.addEventListener('click', guardarEvento);

let tituloOriginal = '';
let descripcionOriginal = '';
let colorOriginal = '';

async function guardarEvento() {
    const titulo = document.getElementById('titulo-evento').value;
    const descripcion = document.getElementById('descripcion-evento').value;
    const color = document.getElementById('color-evento').value;

    const evento = await window.electronAPI.getEvent({ fecha: fechaSeleccionada });

    if (evento) {
        await window.electronAPI.updateEvent({ titulo, fecha: fechaSeleccionada, descripcion, color });
        alert('Evento actualizado correctamente');
    } else {
        await window.electronAPI.addEvent({ titulo, fecha: fechaSeleccionada, descripcion, color });
        alert('Evento guardado correctamente');
    }
    borrarCalendario();
    await crearCalendario(mesEnPantalla, anioEnPantalla);

    // Cierra el sidebar y limpia la selección
    sidebar.classList.remove('active');
    contenedorCentral.style.transform = '';
    fechaSeleccionada = null;
}



async function ponerContenidoEvento() {
    const evento = await window.electronAPI.getEvent({ fecha: fechaSeleccionada });

    if (evento) {
        document.getElementById('titulo-evento').value = evento.titulo;
        document.getElementById('descripcion-evento').value = evento.descripcion || '';
        document.getElementById('color-evento').value =evento.color || '';
        tituloOriginal = evento.titulo || '';
        descripcionOriginal = evento.descripcion || '';
        colorOriginal = evento.color || '';
    } else {
        document.getElementById('titulo-evento').value = '';
        document.getElementById('descripcion-evento').value = '';
        document.getElementById('color-evento').value = '#000000';
        tituloOriginal = '';
        descripcionOriginal = '';
        colorOriginal = '#000000';
    }
    mostrarBotonGuardar();
}
