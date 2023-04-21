//Variables globales de ataque y vida de cada uno
const sectionSeleccionAtaque = document.getElementById("seleccionar-ataque")
const sectionReinicio = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")

const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidaJugador = document.getElementById("vida-jugador")
const spanVidaEnemigo = document.getElementById("vida-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataquesDelJugador")
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let vidaJugador = 3
let vidaEnemigo = 3
let victoriasJugador = 0
let victoriasEnemigo = 0
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './images/mokemap.png'



// CLASE y OBJETOS de la clase

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", './images/Alma.png', 5, './images/Alma.png')
let capipepo = new Mokepon("Capipepo", './images/chaco.jpg', 5,'./images/chaco.jpg')
let ratigueya = new Mokepon("Ratigueya", './images/Emo.jpg', 5, './images/Emo.jpg')

let hipodogeEnemigo = new Mokepon("Hipodoge", './images/Alma.png', 5, './images/Alma.png', 400, 120)
let capipepoEnemigo = new Mokepon("Capipepo", './images/chaco.jpg', 5,'./images/chaco.jpg', 120, 450)
let ratigueyaEnemigo = new Mokepon("Ratigueya", './images/Emo.jpg', 5, './images/Emo.jpg', 700, 470)



// Ataques de cada uno de los mokepones

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

// funcion que indica que ataque selecciono el jugador

function iniciarJuego() {

    sectionSeleccionAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id= ${mokepon.nombre} /> 
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img class="imagenes" src=${mokepon.foto}>
        </label> 
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })

    sectionReinicio.style.display = "none"

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

// funcion que indica que mascota selecciono el jugador

function seleccionarMascotaJugador() {
    /* sectionSeleccionAtaque.style.display = "flex"  */
    sectionSeleccionMascota.style.display = "none"

    /* el orden es X, Y , Ancho y Alto. Se modifica a Draw Image porque para cargar imagen se necesita otra funcion el orden de parametros de tamaño es el mismo */
    /* lienzo.fillRect(5,15,20,40) */

    // if de cambio de texto donde indica que mascota seleccionaste en HTML

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id;
    }
    else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }
    else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }
    else {
        alert("Tienes que seleccionar una mascota!")
    }

    extraerAtaques(mascotaJugador)

    // funcion explicada mas abajo
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    seleccionarMascotaEnemigo()

}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++)
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="botonAtaque BAtaque">${ataque.nombre}</button> `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }

            ataqueAleatorioEnemigo()
        })

    })

}

// funcion de aleatoriedad de seleccion de mascota del enemigo 

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}


// eleccion de ataque aleatorio del enemigo

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO")
    }
    else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA")
    }
    else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5)
        combate()
}
// funcion de combate indica quien gana, empata o pierde de acuerdo a las selecciones de los dos jugadores. 

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i)
            crearMensaje("EMPATE 😅")
        }
        else if (ataqueJugador[i] === "FUEGO" && ataqueEnemigo[i] === "TIERRA") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTEEEE😁")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] === "AGUA" && ataqueEnemigo[i] === "FUEGO") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTEEEE😁")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[i] === "TIERRA" && ataqueEnemigo[i] === "AGUA") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTEEEE😁")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE 😭")
            victoriasEnemigo++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }

    }// funcion para chequear vidas y saber quien gano y perdio

    revisarVidas()

}

// funcion revisar vidas.

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo)
        crearMensajeFinal("Esto fue un EMPATE! 😮");
    else if (victoriasJugador > victoriasEnemigo)
        crearMensajeFinal("GANASTE EL JUEGO!!! 😎");
    else {
        crearMensajeFinal("Perdiste el juego!! 😪")
    }
}


// funcion de mensaje en HTML donde indica los ataques de ambos jugadores y su respectivo resultado, ya que trae la funcion de linea 101.

function crearMensaje(resultado) {

    let nuevoAtaqueDelEnemigo = document.createElement("p")
    let nuevoAtaqueDelJugador = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo


    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal

    sectionReinicio.style.display = "block"
}


// funcion de reinicio de juego

function reiniciarJuego() {
    location.reload()
}


function pintarCanvas() {
    mascotaJugadorObjeto
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
}

function moverMiMokepon() {
    mascotaJugadorObjeto
    botonDerecho = document.getElementById("moverDerecha")
    botonAbajo = document.getElementById("moverAbajo")
    botonIzquierda = document.getElementById("moverIzquierda")
    botonArriba = document.getElementById("moverArriba")
    botonesMovimiento = [botonDerecho, botonAbajo, botonIzquierda, botonArriba]

    botonesMovimiento.forEach((boton) => {
        boton.addEventListener("mousedown", (e) => {
            if (e.target.id === "moverDerecha") {
                mascotaJugadorObjeto.velocidadX = 5
                botonDerecho.style.background = "#F0FC00"
            } else if (e.target.id === "moverAbajo") {
                mascotaJugadorObjeto.velocidadY = 5
                botonAbajo.style.background = "#F0FC00"
            } else if (e.target.id === "moverIzquierda") {
                mascotaJugadorObjeto.velocidadX = -5
                botonIzquierda.style.background = "#F0FC00"
            } else {
                mascotaJugadorObjeto.velocidadY = -5
                botonArriba.style.background = "#F0FC00"
            }
            pintarCanvas()
        })
    })
}

function sePresionoUnaTecla(event) {
    mascotaJugadorObjeto

    if (event.key === "ArrowRight") {
        mascotaJugadorObjeto.velocidadX = 5
        botonDerecho.style.background = "#F0FC00"
    }
    else if (event.key === "ArrowDown") {
        mascotaJugadorObjeto.velocidadY = 5
        botonAbajo.style.background = "#F0FC00"
    }
    else if (event.key === "ArrowLeft") {
        mascotaJugadorObjeto.velocidadX = -5
        botonIzquierda.style.background = "#F0FC00"
    }
    else if (event.key === "ArrowUp") {
        mascotaJugadorObjeto.velocidadY = -5
        botonArriba.style.background = "#F0FC00"
    }
}




function detenerMovimiento() {
    mascotaJugadorObjeto
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
    botonDerecho.style.background = "#FFFFFF"
    botonAbajo.style.background = "#FFFFFF"
    botonIzquierda.style.background = "#FFFFFF"
    botonArriba.style.background = "#FFFFFF"
}

function iniciarMapa() {
    mapa.width = 800
    mapa.height = 600
    mascotaJugadorObjeto = obtenerObjetoMascota()
    intervalo = setInterval(pintarCanvas, 50)
    moverMiMokepon()
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++)
        if (mascotaJugador == mokepones[i].nombre) {
            return mokepones[i]
        }

    mostrarAtaques(ataques)
}


// FUNCION DE ALEATORIEDAD
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// esto es para que el JS se ejecute una vez cargada la pagina.

window.addEventListener("load", iniciarJuego)
