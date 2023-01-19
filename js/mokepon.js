//Variables globales de ataque y vida de cada uno
const sectionSeleccionAtaque = document.getElementById("seleccionar-ataque")
const sectionReinicio = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonTierra = document.getElementById("boton-tierra")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById ("mascota-jugador")

const spanMascotaEnemigo = document.getElementById ("mascota-enemigo")

const spanVidaJugador = document.getElementById("vida-jugador")
const spanVidaEnemigo = document.getElementById("vida-enemigo")

const sectionMensajes = document.getElementById("resultado")   
const ataquesDelJugador = document.getElementById("ataquesDelJugador")
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let vidaJugador = 3
let vidaEnemigo = 3
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya

// CLASE y OBJETOS de la clase

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge",'./images/Alma.png', 5)
let capipepo = new Mokepon("Capipepo", './images/chaco.jpg', 5)
let ratigueya = new Mokepon("Ratigueya", './images/Emo.jpg', 5)



// Ataques de cada uno de los mokepones

hipodoge.ataques.push(
    { nombre: '💧',id: 'boton-agua' },
    { nombre: '💧',id: 'boton-agua' },
    { nombre: '💧',id: 'boton-agua' },
    { nombre: '🔥',id: 'boton-fuego' },
    { nombre: '🌱',id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱',id: 'boton-tierra'},
    { nombre: '🌱',id: 'boton-tierra'},
    { nombre: '🌱',id: 'boton-tierra'},
    { nombre: '🔥',id: 'boton-fuego' },    
    { nombre: '💧',id: 'boton-agua' },
)

ratigueya.ataques.push(
    { nombre: '🔥',id: 'boton-fuego' },
    { nombre: '🔥',id: 'boton-fuego' },
    { nombre: '🔥',id: 'boton-fuego' },
    { nombre: '💧',id: 'boton-agua' },
    { nombre: '🌱',id: 'boton-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

// funcion que indica que ataque selecciono el jugador

function iniciarJuego () {
    
    sectionSeleccionAtaque.style.display = "none"    

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id= ${mokepon.nombre} /> 
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img class="imagenes" src=${mokepon.foto}>
        </label> 
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById ("Hipodoge")
    inputCapipepo = document.getElementById ("Capipepo")
    inputRatigueya = document.getElementById ("Ratigueya")
    })

    sectionReinicio.style.display = "none"    

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)    
    botonFuego.addEventListener("click", ataqueFuego)   
    botonAgua.addEventListener("click", ataqueAgua)    
    botonTierra.addEventListener("click", ataqueTierra)    
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

// funcion que indica que mascota selecciono el jugador

function seleccionarMascotaJugador() {    
    sectionSeleccionAtaque.style.display = "flex"    
    sectionSeleccionMascota.style.display = "none"
// if de cambio de texto donde indica que mascota seleccionaste en HTML

    if (inputHipodoge.checked)
        spanMascotaJugador.innerHTML = inputHipodoge.id
    else if (inputCapipepo.checked)
    spanMascotaJugador.innerHTML = inputCapipepo.id
    else if (inputRatigueya.checked)
    spanMascotaJugador.innerHTML = inputRatigueya.id
    else {
        alert("Tienes que seleccionar una mascota!")
    }

    // funcion explicada mas abajo

    seleccionarMascotaEnemigo()
        
}

// funcion de aleatoriedad de seleccion de mascota del enemigo 

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0,mokepones.length -1)    

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
}

// funciones de ataques de cada uno, cada una se activa con los eventlistener de los botones

function ataqueFuego() {
    ataqueJugador = "FUEGO"
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = "AGUA"
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = "TIERRA"
    ataqueAleatorioEnemigo()
}

// eleccion de ataque aleatorio del enemigo

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)

    if(ataqueAleatorio == 1){
        ataqueEnemigo = "FUEGO"
    }
    else if(ataqueAleatorio == 2){
        ataqueEnemigo = "AGUA"
    }
    else if (ataqueAleatorio == 3){
        ataqueEnemigo = "TIERRA"
    }

// funcion combate explicada mas abajo

    combate()
}

// funcion de combate indica quien gana, empata o pierde de acuerdo a las selecciones de los dos jugadores. 

function combate() {    

    if(ataqueEnemigo == ataqueJugador){
    crearMensaje("EMPATE 😅")
}else if((ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") || (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") || (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA")){
    crearMensaje("GANASTEEEE😁") 
    vidaEnemigo--
    spanVidaEnemigo.innerHTML = vidaEnemigo    
}else{
    crearMensaje("PERDISTE 😭")
    vidaJugador--
    spanVidaJugador.innerHTML = vidaJugador
   
} // funcion para chequear vidas y saber quien gano y perdio

revisarVidas()

};

// funcion revisar vidas.

function revisarVidas(){
    if (vidaEnemigo === 0)
    crearMensajeFinal("GANASTE EL JUEGOOOOO")
    else if(vidaJugador === 0)
    crearMensajeFinal("NOOOOOO PERDISTE 😪")
}


// funcion de mensaje en HTML donde indica los ataques de ambos jugadores y su respectivo resultado, ya que trae la funcion de linea 101.

function crearMensaje(resultado){
   
    let nuevoAtaqueDelEnemigo = document.createElement("p")
    let nuevoAtaqueDelJugador = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){   

    sectionMensajes.innerHTML = resultadoFinal 
    
    sectionReinicio.style.display = "block"
    
    botonFuego.disabled = true
    
    botonAgua.disabled = true
    
    botonTierra.disabled = true
}


// funcion de reinicio de juego

function reiniciarJuego(){
    location.reload()
}


// FUNCION DE ALEATORIEDAD
function aleatorio (min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

// esto es para que el JS se ejecute una vez cargada la pagina.

window.addEventListener("load", iniciarJuego)
