const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');


let keys={
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}

let player = {
    start: false,
    x: 0,
    y: 0,
    speed: 5
}
let heightOfRoad

startScreen.addEventListener('click', start);

document.addEventListener("keydown", keyPress)
document.addEventListener("keyup", keyRelease)  


function keyPress(event_details){
    // console.log(event_details.key,"is pressed");
    keys[event_details.key] = true;
    // console.log(keys);
}

function keyRelease(event_details){
    // console.log(event_details.key, "is released");
    keys[event_details.key] = false;
    // console.log(keys);
}

// just for explanation
// const stop = document.querySelector('.stop');
// stop.addEventListener('click', stopTheGame);
// function stopTheGame(){
//     player.start = false;
//     console.log('Game stopped');
// }


function gamePlay(){
      let car  = document.querySelector('.car');
      let road = gameArea.getBoundingClientRect();
      console.log(road);
      heightOfRoad = road.height;

       // x = 100 ,  y = 195
    //   console.log(player.x, player.y)
      if(player.start == true){
           moveLines();

          if(keys.ArrowUp && player.y > 0){
             player.y = player.y - player.speed;
          }
          if(keys.ArrowDown && player.y < road.height-car.offsetHeight){
               player.y = player.y + player.speed;
          }
          if(keys.ArrowLeft && player.x > 0){
               player.x = player.x - player.speed;
          }
         if(keys.ArrowRight && player.x < road.width-car.offsetWidth){
                player.x = player.x + player.speed;
         }
         // updating the css of the car based on x and y
         car.style.left = player.x + 'px';
         car.style.top = player.y + 'px';

        requestAnimationFrame(gamePlay);
      }
}



function moveLines(){
    let lines = document.querySelectorAll('.line');
    for(let line of lines){
           /// asume height is 1000
           if(line.y >=heightOfRoad){
                line.y =line.y - heightOfRoad;
           }
           line.y = line.y + player.speed;
           line.style.top = line.y + 'px';
    }

}








function start(){
    startScreen.classList.add('hide');
    gameArea.classList.remove('hide');
    
    console.log('clicked');
    player.start = true;
    requestAnimationFrame(gamePlay);
     

    // creting lines -borders: 

    for(let lines = 0; lines < 5; lines++){
          let div = document.createElement('div');
          div.className = 'line';
          div.y= lines*150;
          div.style.top = lines*150 + 'px';
          gameArea.appendChild(div);
    }

    let car = document.createElement('div');
    car.innerText = 'car';
    car.className = 'car';
    gameArea.append(car)
    // console.log(car.offsetLeft, car.offsetTop);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}