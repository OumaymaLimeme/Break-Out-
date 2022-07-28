const grid=document.querySelector('.grid')
const scoredisplay=document.querySelector('#score')
const blockwidth=100
const blockheight=20

const userstart=[230,10]

const boardwidth=560
const boardheight=300
let currentposition= userstart

const ballstart=[270,40]
let ballcurrentposition=ballstart
let time
const balldiametre=20

let xdirection=-2
let ydirection=2
let score=0
// create Block
class Block{
    constructor(xAxis,yAxis){
        this.bottomleft=[xAxis,yAxis]
        this.bottomright=[xAxis+blockwidth,yAxis]
        this.topleft=[xAxis,yAxis+blockheight]
        this.topright=[xAxis+blockwidth,yAxis+blockheight]

    }
}
// all my blocks
const blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]




//Draw my Block
function addBlocks(){
    for(let i=0;i<blocks.length;i++){
    const block=document.createElement('div')
   block.classList.add('block')
   block.style.left=blocks[i].bottomleft[0]+'px'
   block.style.bottom=blocks[i].bottomleft[1]+'px'
  grid.appendChild(block)
  console.log(blocks[i].bottomleft)
    }
}
addBlocks()
//add user 
const user = document.createElement('div')
user.classList.add('user')
user.style.left=currentposition[0]+'px'
user.style.bottom=currentposition[1]+'px'
grid.appendChild(user)

// draw the user 
      function drawuser(){
        user.style.left=currentposition[0]+'px'
        user.style.buttom=currentposition[1]+'px'
      }

 // draw the ball
       function drawball(){
        ball.style.left=ballcurrentposition[0]+'px'
        ball.style.bottom=ballcurrentposition[1]+'px'
       }     
//move user 
function moveuser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentposition[0]>0){
             currentposition[0]-=10
            drawuser()
            }
            break
            case 'ArrowRight':
                if(currentposition[0]<boardwidth-blockwidth){
                 currentposition[0]+=10
                drawuser()
                }
                break
    }

}
document.addEventListener('keydown',moveuser)
// add ball
const ball=document.createElement('div')
ball.classList.add('ball')
drawball()
grid.appendChild(ball)

  // move the ball
   function moveball(){
    ballcurrentposition[0]+=xdirection
    ballcurrentposition[1]+=ydirection
    drawball()
    chekforcollision()
    }
  time= setInterval(moveball,30)
  // check for collision 
  function chekforcollision(){
    //check for block collision
    for(let i=0;i<blocks.length;i++){
        if(
            (ballcurrentposition[0]>blocks[i].bottomleft[0] && ballcurrentposition[0]< blocks[i].bottomright[0]) &&
            ((ballcurrentposition[1]+balldiametre)>blocks[i].bottomleft[1]  && ballcurrentposition[1]<blocks[i].topleft[1])
        ) {
            const allblocks=Array.from(document.querySelectorAll('.block'))
            allblocks[i].classList.remove('block')
            blocks.splice(i,1)
            changedirection()
            score++
            scoredisplay.innerHTML=score
            //check for win
            if(blocks.length===0){
                scoredisplay.innerHTML='You win'
                clearInterval(time)
                scoredisplay.innerHTML=score
            }
        }



    }
    //check for wall colllision
    if(ballcurrentposition[0]>=(boardwidth- balldiametre) || ballcurrentposition[1]>=(boardheight-balldiametre)
    || ballcurrentposition[0]<=0){
    changedirection()
  }
  //check for user collision
  if(
    (ballcurrentposition[0]>currentposition[0] && ballcurrentposition[0]<currentposition[0]+blockwidth)
   &&(ballcurrentposition[1]>currentposition[1] && ballcurrentposition[1]<currentposition[1]+blockheight)
  ){
    changedirection()
  }

  // chek for game over 
  if(ballcurrentposition[1]<=0){
    clearInterval(time)
    scoredisplay.innerHTML='You lose '
    document.removeEventListener('keydown',moveuser)
  }
}
function changedirection(){
    if(xdirection===2 && ydirection===2){
        ydirection=-2
        return
    }
    if(xdirection===2 && ydirection===-2){
        xdirection=-2
        return
    }
     if(xdirection===-2 && ydirection===-2){
        ydirection=2
        return
     }
}