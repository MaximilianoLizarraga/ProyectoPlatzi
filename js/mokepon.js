//Variables globales de ataque y vida de cada uno
const sectionSeleccionAtaque = document.getElementById("seleccionar-ataque")
const sectionReinicio = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonTierra = document.getElementById("boton-tierra")
const botonReiniciar = document.getElementById("boton-reiniciar")
const sectionSeleccionMascota = document.getElementById("seleccionar-mascota")
const inputHipodoge = document.getElementById ("hipodoge")
const inputCapipepo = document.getElementById ("capipepo")
const inputRatigueya = document.getElementById ("ratigueya")
const spanMascotaJugador = document.getElementById ("mascota-jugador")
const spanMascotaEnemigo = document.getElementById ("mascota-enemigo")
const spanVidaJugador = document.getElementById("vida-jugador")
const spanVidaEnemigo = document.getElementById("vida-enemigo")

const sectionMensajes = document.getElementById("resultado")   
const ataquesDelJugador = document.getElementById("ataquesDelJugador")
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")

let ataqueJugador
let ataqueEnemigo
let vidaJugador = 3
let vidaEnemigo = 3

// funcion que indica que ataque selecciono el jugador

function iniciarJuego () {
    
    sectionSeleccionAtaque.style.display = "none"    
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
        spanMascotaJugador.innerHTML = "Hipodoge"
    else if (inputCapipepo.checked)
    spanMascotaJugador.innerHTML = "Capipepo"
    else if (inputRatigueya.checked)
    spanMascotaJugador.innerHTML = "Ratigueya"
    else {
        alert("Tienes que seleccionar una mascota!")
    }

    // funcion explicada mas abajo

    seleccionarMascotaEnemigo()
        
}

// funcion de aleatoriedad de seleccion de mascota del enemigo 

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(1,3)    

// similar a lo explicado arriba, if de cambio de texto en HTML de seleccion de mascota del enemigo

        if(mascotaAleatorio == 1)
            spanMascotaEnemigo.innerHTML = "Hipodoge"
        else if (mascotaAleatorio == 2)
            spanMascotaEnemigo.innerHTML = "Capipepo"
        else if (mascotaAleatorio == 3)
            spanMascotaEnemigo.innerHTML = "Ratigueya"
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
