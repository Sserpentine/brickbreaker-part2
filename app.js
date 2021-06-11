var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ballRadius = 20;
var x = canvas.width/2;
var y= canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsettop = 30;
var brickOffsetLeft = 30;
var score = 0;

var bricks=[];
for(var c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(var r = 0; r<brickRowCount; r++){
        bricks[c][r]={x:0, y:0, status:1};
    }
}

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false)

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
    }

    function keyUpHandler(e){
        if(e.key == "Right" || e.key == "ArrowRight"){
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft"){
            leftPressed = false;
        }
        }

        function mouseMoveHandler(e){
            var relativeX = e.clientX - canvas.offsetLeft;
            if(relativeX>0 && relativex<canvas.width){
                paddleX = relativeX - paddleWidth/2;
            }
        }

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 10, Math.PI);
    ctx.fillStyle = "#7175FF";
    ctx.fill();
    ctx.closePath();   
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FF6CA8";
    ctx.fill();
    ctx.closePath();
}
function drawBricks(){
    for(var c=0; c<brickColumnCount; c++){
        for(var r= 0; r<brickRowCount; r++){
            if(bricks[c][r].status == 1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsettop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#FF6CA8";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function drawScore (){
    ctx. font = "16px Arial";
    ctx. fillStyle="#7175FF"
    ctx.fillText("Score: " +score, 8, 20);


}

function collisionDetection(){
    for(var c=0; c<brickColumnCount; c++){
        for(var r= 0; r<brickRowCount; r++){
            var b  = bricks[c][r];
            if(b.status == 1){
                if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                    dy = -dy;
                    b. status =0;
                    score++;
                        if(score == brickRowCount*brickColumnCount){
                            alert("You win! Congrats!");
                            document.location.reload();
                            clearInterval(interval);
                        }
                }
            }
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
x += dx;
y += dy;

    if(x+dx < ballRadius || x+dx > canvas.width - ballRadius){
        dx= -dx;
    }

    if(y+dy < ballRadius ){
        dy= -dy;
    }
    else if ( y+dy > canvas.height - ballRadius){
        if(x>paddleX && x<paddleX+paddleWidth){
            dy = -dy;
        }
        else{
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }
    }
    if(rightPressed){
        paddleX += 7;
        if(paddleX + paddleWidth> canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed){
        paddleX -= 7;
    if(paddleX<0){
        paddleX=0;
    }
    }
}

var interval = setInterval(draw,10);
