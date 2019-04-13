var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var bird = new Image();
var background = new Image();
var frontground = new Image();
var pipeTop = new Image();
var pipeBottom = new Image();

bird.src = "images/bird.png";
background.src = "images/bg.png";
frontground.src = "images/fg.png";
pipeTop.src = "images/pipeNorth.png";
pipeBottom.src = "images/pipeSouth.png";

//Audio Files
var flySound = new Audio();
var scoreSound = new Audio();

flySound.src = "sounds/fly.mp3";
scoreSound.src = "sounds/score.mp3";

//Variables
var gap = 95;
var constant;

var bX = 10;
var bY = 150;

var gravity = .5;

var score = 0;

// on Key Down
document.addEventListener("keydown", function(e){
    var code = e.which || e.keyCode;
    if(code == '38'){
        bY -= 25;
        flySound.play();
    } else if(code == '40'){
        bY += 20;
        flySound.play();
    }
});

    

// Pipe Coordinates
var pipe = [];
pipe[0] = {
    x : canvas.width,
    y : 0
};



function draw(){
    context.drawImage(background, 0, 0);
    //Draws Pipes and creates new Random Pipes
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeTop.height + gap;
        context.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if(pipe[i].x == 100){
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random()*pipeTop.height) - pipeTop.height
            });
        }

        //Collision Detection
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeTop.width && (bY <= pipe[i].y + pipeTop.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= canvas.height - frontground.height){
            location.reload(); //Reloads Page
        }
        if(pipe[i].x == 5){
            score++;
            scoreSound.play();
        }
    }

    context.drawImage(frontground, 0, canvas.height - frontground.height);

    context.drawImage(bird, bX, bY);

    //Score
    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : "+score, 10, canvas.height-20);

    //Gravity
    bY += gravity;
    requestAnimationFrame(draw);
}

draw();
