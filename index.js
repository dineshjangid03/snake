

//game constants & variables
let inputDir={x:0, y:0};
const foodSound=new Audio('food.mp3');
// const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('');
const musicSound=new Audio('music.mp3');
let speed=5;
let score=0;
let highscore=localStorage.getItem("score")||score
let lastPaintTime=0;
let snakeArr=[
    {x:13, y:15}
]
food={x:6, y:7};

// function for manual speed
speedfun()
function speedfun(){
    let sp=document.getElementById("speed").value
    speed=+sp
}

//game function
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into yourself
    for(let i=1; i<snakeArr.length; i++){
      if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y){
          return true;
      }
    }
    //if you bump into the wall
      if(snake[0].x>=20||snake[0].x<=0 || snake[0].y>=20||snake[0].y<=0){
          return true;
      }
    
}


function gameEngine(){
    //part 1 updating the snake array & food
    if(isCollide(snakeArr)){
        // gameOverSound.play();
        // musicSound.pause();
        inputDir={x:0, y:0};
        alert("Game over. press any key to play again!");
        if(highscore<=score){
            localStorage.setItem("score",score)
            let highscoreBox=document.getElementById("highscoreBox")
            highscoreBox.innerHTML="High Score: "+ score;
        }
        window.location.reload()
        snakeArr=[{x:13,y:15}];
        //musicSound.play();
        score=0;
    }


    let highscoreBox=document.getElementById("highscoreBox")
    highscoreBox.innerHTML="High Score: "+ highscore;



    //if you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score += 1
        scoreBox.innerHTML="Score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x,y: snakeArr[0].y+inputDir.y});
        let a= 2;
        let b= 18;
        food={x: Math.round(a+ (b-a)*Math.random()),y: Math.round(a+ (b-a)*Math.random())}
    }

    //moving the snake
    for(let i=snakeArr.length-2; i>=0; i--){
        //const element = array[i];
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2 display the snake and food
    //display the snake
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.classList.add('snake');
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);


}



// main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir={x:0, y:1}
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
});


function buttonup(){
    inputDir.x= 0;
    inputDir.y= -1;
}
function buttondown(){
    inputDir.x= 0;
    inputDir.y= 1;
}
function buttonleft(){
    inputDir.x= -1;
    inputDir.y= 0;
}
function buttonright(){
    inputDir.x= 1;
    inputDir.y= 0;
}