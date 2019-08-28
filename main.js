//1.- VARIABLES UNIVERSALES
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let interval;
const pizzas = []

//FUNCIONES CONSTRUCTORAS
class Pusheens {
    constructor () {
        this.x = 280
        this.y = 450
        this.width = 140
        this.height = 140
        this.image1 = new Image()
        this.image1.src = './images/pusheen1.png'
        this.image2 = new Image()
        this.image2.src = './images/pusheen2.png'
        this.image = this.image1
        // this.img3 = new Image()
        // this.img.src = './images/pusheen3.png'
        // this.img4 = new Image()
        // this.img.src = './images/pusheen4.png'
        // this.img.onload = () => {
        //     this.draw()
        // }
    }
    draw(){
        if(this.y < 350) this.y += 2;
        
        if(frames % 25 === 0){
             this.image = this.image == this.image1 ? this.image2 : this.image1;
        }
        ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
    }
    jump(){
        this.y -= 20   
    }
}


class Dads {
    constructor () {
        this.x = 0
        this.y = 200
        this.width = 220
        this.height = 380
        this.image1 = new Image()
        this.image1.src = './images/man-running1.png'
        this.image2 = new Image()
        this.image2.src = './images/man-running2.png'
        this.image = this.image1
    }
    draw(){
        //if(this.y < 350) this.y += 2;
        if(frames % 15 === 0){
             this.image = this.image == this.image1 ? this.image2 : this.image1;
        }
        ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
    }
}

class Pizzas {
    constructor(y, width, height) {
      this.x = canvas.width
      this.y = y
      this.width = width
      this.height = height
      this.image = new Image()
      this.image.src = './images/pizza-slice.jpg'
    }
    draw() {
      this.x-- 
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
  }




class Gameboard {
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width*2
        this.height = canvas.height
        this.img = new Image()
        this.img.src = './images/Back-ground1.jpeg'
        this.img2 = new Image()
        this.img2.src = './images/back-ground2.jpg'
        this.img.onload = () => {
            this.draw()
          }
          this.img2.onload = () => {
            this.draw()
          }
        }
    draw() {
        this.x--
        if (this.x < -(canvas.width*3)) {
          this.x = 0
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height) 
        ctx.drawImage(this.img2, this.x + canvas.width, this.y, this.width, this.height) 
        ctx.drawImage(this.img, this.x + canvas.width*2, this.y, this.width, this.height) 
      }
    
}


//INSTANCIAS

const gameboard = new Gameboard() 
const pusheen = new Pusheens()
const dad = new Dads ()


//FUNCIONES

//ARREGLA ESTA CON RESPECTO A TU JUEGO
function generatePizzas() {
    const min = canvas.height-500 
    const max = canvas.height-20 
    if (frames % 220 === 0) { 
      const randomHeight = Math.floor(Math.random() * (max - min))
      pizzas.push(new Pizzas(0, 50, randomHeight))
    }
  }

function drawPizzas() {
    pizzas.forEach(pizza => {
      pizza.draw()
    })
  }

function start() {
    interval = setInterval(update, 1000 / 60) 
  }


function stop() {
    interval = clearInterval(interval)
    interval = null
  }

//ARREGLA ESTO CON RESPECTO A TU JUEGO
function drawScore() {
  if (frames % 200 === 0) { 
      score += 1
    }
    ctx.font = '24px Courier'
    ctx.fillText(score, canvas.width / 2, 50)
  }


  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    gameboard.draw()
    pusheen.draw()
    dad.draw()
    generatePizzas()
    // drawPizzas()
    // checkCollition()
    drawScore()
  }


//ARREGLA ESTO CON RESPECTO A TU JUEGO
  document.onkeydown = e => {
    e.preventDefault()
    switch (e.keyCode) {
      //espacio (pausa) pon intervalo en null
      case 32:
        // pusheen.jump()
        break
      
        //flecha arriba
      case 38:
          pusheen.jump()
          break

        //Flecha derecha
      case 39:
          break
  
      default:
        break
    }
  }




window.onload = function() {
    gameboard.draw()
    document.getElementById("start-button").onclick = function() {
      start()
    }
}