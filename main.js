//1.- VARIABLES UNIVERSALES
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const instructions = document.querySelector('.wrapper')
const startAudio = document.querySelector('#start-song')
const looserAudio = document.querySelector('#game-over')
const winnerAudio = document.querySelector('#winner')
// const winnerGif =document.querySelector('#win-gif')
let frames = 0
let score = 0
let interval;
const pizzas = []

//FUNCIONES CONSTRUCTORAS
class Pusheens {
    constructor () {
        this.x = 500
        this.y = 450
        this.width = 110
        this.height = 110
        this.health = 40
        this.image1 = new Image()
        this.image1.src = './images/pusheen1.png'
        this.image2 = new Image()
        this.image2.src = './images/pusheen2.png'
        this.image = this.image1
    }
    draw(){
        if(this.y < 420) this.y += 4;
        
        if(frames % 25 === 0){
             this.image = this.image == this.image1 ? this.image2 : this.image1;
        }
        ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
    }

    drawHealth(){
      ctx.fillStyle = '#15C8E0'
      ctx.fillRect(10, 10, this.health*2, 15)
    }
    
    jump(){
        this.y -= 40   
    }
    moveFoward(){
      this.x +=20
    }
    moveBackward(){
      this.x -=20
    }
    moveDown(){
      this.y +=20
    }
    isTouching(obstacle) { 
      return (
        this.x < obstacle.x + obstacle.width && 
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height && 
        this.y + this.height > obstacle.y 
  )
    }
}


class Dads {
    constructor () {
        this.x = 0
        this.y = 200
        this.width = 200
        this.height = 350
        this.direction = 'right'
        this.image1 = new Image()
        this.image1.src = './images/man-running1.png'
        this.image2 = new Image()
        this.image2.src = './images/man-running2.png'
        this.image3 = new Image()
        this.image3.src = './images/mirror-man1.png'
        this.image4 = new Image()
        this.image4.src = './images/mirror-man2.png'
        this.image = this.image1
    }

    draw(){
      this.direction === 'right' ? this.x +=4 : this.x -=4

      if (this.x < 0 && this.direction=='left') this.direction='right'
      else if (this.x > canvas.width - this.width && this.direction == 'right') {
        this.direction = 'left' 
        this.image==this.image3
      } 

      if (this.direction =='right' && frames % 15 === 0){
          this.image = this.image == this.image1 ? this.image2 : this.image1;
      } else if (this.direction == 'left' && frames %15 ===0) {
        this.image = this.image == this.image3 ? this.image4 : this.image3;
      }
      ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
    }
    
}




class Pizzas {
    constructor() {
      this.x = Math.floor(Math.random()*canvas.width)
      this.y = -50
      this.width = 70
      this.height = 70
      this.image = new Image()
      this.image.src = './images/pizza.png'
      this.image.onload = () => {
      this.draw()
      }
    }
    draw() {
      this.y+=4 
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

function showInstructions(){
  instructions.classList.toggle('display')
}

function generatePizzas() {
    if (frames % 150 === 0) { 
      pizzas.push(new Pizzas())
    }
  }

function drawPizzas() {
    pizzas.forEach(pizza => {
      pizza.draw()
    })
  }

function start() {
    interval = setInterval(update, 1000 / 60) 
    startAudio.play()
}


function stop() {
    interval = clearInterval(interval)
    interval = null
  }

  function gameOver() {
    looserAudio.play()
    ctx.font = '70px Courier'
    ctx.fillStyle = '#E01515'
    ctx.fillText('Game Over', canvas.width / 2-150, canvas.height/2)
    canvas.classList.add('looser')
    clearInterval(interval) 
    setTimeout(() => {
      location.reload()
    }, 3000)
    startAudio.pause()
  }


  function youWon(){
    let image = new Image()
    image.src = './images/you-win.gif'
    winnerAudio.play()
    ctx.font = '80px Courier'
    ctx.fillStyle = '#1556E0'
    ctx.fillText('You won!!', canvas.width / 2-150, canvas.height/2)
    canvas.classList.add('winner')
    clearInterval(interval)
    setTimeout(()=>{
      location.reload()
    }, 4000)
    startAudio.pause()

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    } 
  }


function drawScore() {
    ctx.font = '35px Courier'
    ctx.fillText(`Your Score: ${score}`, canvas.width / 2, 50)
  }



  function checkCollition() {

    if(pusheen.y < 0 ){
     pusheen.y =0}
     else if (pusheen.y >canvas.height-pusheen.height){
       pusheen.y = canvas.height-pusheen.height
     }
    else if(pusheen.x >= canvas.width ){
      pusheen.x = - pusheen.width
    } else 
    if (pusheen.x < - pusheen.width)
      pusheen.x = canvas.width -1
    
    
    if (pusheen.isTouching(dad)) return gameOver()

    if(score=== 50) return youWon()

    
    pizzas.forEach((pizza, index) => { 
      if (pusheen.isTouching(pizza)){
        pizzas.splice(index,1)
        score += 10
      }
    })
  }


  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    gameboard.draw()
    pusheen.draw()
    dad.draw()
    generatePizzas()
    drawPizzas()
    checkCollition()
    drawScore()
  }



  document.onkeydown = e => {
    e.preventDefault()
    switch (e.keyCode) {
      //espacio (pausa) 
      case 32:
      if (interval){
        stop()
      } else {
        start()
      }
      break
      
        //flecha arriba
      case 38:
          pusheen.jump()
          break

        //Flecha derecha
      case 39:
          pusheen.moveFoward()
          break
        //Flecha izquierda  
      case 37:
          pusheen.moveBackward()
          break
        //Flecha abajo
      case 40:
          pusheen.moveDown()
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

// comment only to push