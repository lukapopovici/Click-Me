var score = 0;
var isOver = 0;
var dot_number = 10;

function blink_score() {
  var scoreElement = document.getElementById("score");

  if (scoreElement) {
    scoreElement.style.boxShadow = "0 0 10px 5px rgba(255, 255, 255, 0.8)";
    scoreElement.style.transition = "box-shadow 0.3s ease-in-out";

    setTimeout(function() {
      scoreElement.style.boxShadow = "none";
    }, 200);
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min + 'px';
}

function display_score() {
  if (isOver == 0)
    document.getElementById("score").innerHTML = score;
}

function createCircle(height, width) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  //the following code makes it sure i don't spawn 2 dots in the same place
  //i check the coordinates of the dot i drew last (if it exists)
  const last_circle = document.querySelector('.circle:last-of-type');
  if (last_circle) {
    const lastCircleRect = last_circle.getBoundingClientRect();
    const lastCircleTop = lastCircleRect.top + lastCircleRect.height;
    const lastCircleLeft = lastCircleRect.left + lastCircleRect.width;
    //i will draw the next dot a minimal distance of 100 pixels away 
    const minDistance = 100;

    const first_sign = Math.random() < 0.5 ? -1 : 1;
    const second_sign = Math.random() < 0.5 ? -1 : 1;
    //my best attempt to make random distances
    const randomDistanceX = Math.floor(Math.random() * (width / 2 - minDistance)) + minDistance;
    const randomDistanceY = Math.floor(Math.random() * (height / 2 - minDistance)) + minDistance;
  
    //randomly add or subtract the random distance form the position of the last circle
    const top = lastCircleTop + first_sign * randomDistanceY;
    const left = lastCircleLeft + second_sign * randomDistanceX;
    
    //make sure i don't croos the border
    circle.style.top = Math.min(Math.max(top, 0), height) + 'px';
    circle.style.left = Math.min(Math.max(left, 0), width ) + 'px';
  } else {
    circle.style.top = getRandomNumber(0, height);
    circle.style.left = getRandomNumber(0, width );
  }

  circle.style.backgroundColor = "red";
  document.getElementById('container').appendChild(circle);

  circle.addEventListener('click', function() {
    this.remove();
    blink_score();
    score++;
  });

  // Remove the dot after 2 seconds of not being clicked
  const self = this;
  this.timer = setTimeout(function() {
    circle.remove();
  }, 900);
}


function ShowScore() {
  document.getElementById("score").innerHTML = "Your score is " + score + "/" + dot_number;
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("startbutton").addEventListener("click", function() {
    let counter = 0;

    document.getElementById("startbutton").remove();

    const intervalId = setInterval(function() {
      //stop making dots after the set number of dots is reached
      if (counter < dot_number) {
        createCircle(window.innerHeight - 100, window.innerWidth - 100);
        counter++;
      }
      //stop everything as soon as there are no more dots on screen
      if (document.getElementsByClassName('circle').length == 0) {
        clearInterval(intervalId);
        isOver = 1;
        setTimeout(ShowScore, 3000);
      }
    }, 1000);

    setInterval(display_score, 100);
  });
});
