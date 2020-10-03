var canvas = document.getElementById("myCanvas");


// Keystroke Variables
var rightPressed = false;
var leftPressed = false;

// Display Variables
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 1;
var dy = -1;
var ballRadius = 5;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

// Bricks
var brickRowCount = 5;
var brickColumnCount = 11;
var brickWidth = 21;
var brickHeight = 5;
var brickPadding = 5;
var brickOffsetTop = 20;
var brickOffsetLeft = 9;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

// Score
var score = 0;

// Lives
var lives = 3;

// Keystroke Functions
    // Listening for keystrokes by assigning a pressed key with the variable "keydown"
    document.addEventListener("keydown", keyDownHandler, false);
    // Listening for release of key by assigning a key release with the variable "keyup"
    document.addEventListener("keyup", keyUpHandler, false);
    // Listening for mouse movement
    document.addEventListener("mousemove", mouseMoveHandler, false);
    // If the mouse is moved, the paddle will move
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }
    // If the arrow key is pressed by the user, the variable "rightPressed" / "leftPressed" is assigned true status
    function keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        } 
    }

    // If the arrow key is released by the user, the variable "rightPressed" / "leftPressed" is assigned false status
    function keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

// Collision Detection Functions
    // 1: Adds 1 to c until c is not less than the "brickColumnCount" variable
    // 2: Adds 1 to r until r is not less than the "brickRowCount" variable
    // 3: The "b" variable checks the remaining bricks within the drawBricks() function
    // 4: Checks if status of "b" variable is equal to 1
    // 5: Check to see if the center of the ball is inside the coordinates of one of the existing bricks created with the drawBricks() function using the "b" variable and some maths
    // 6: Changes direction of the ball
    // 7: Changes status of b to 0
    function collisionDetection() {
        // 1
        for(var c=0; c<brickColumnCount; c++) {
            // 2
            for(var r=0; r<brickRowCount; r++) {
                // 3
                var b = bricks[c][r];
                // 4
                if(b.status == 1) {
                    // 5
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        // 6
                        dy = -dy;
                        // 7
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount) {
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

// Score Function
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score, 5, 15);
    }

// Lives Function
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+lives, canvas.width-60, 15);
    }


// Display Functions
    // This function displays the blue ball and sets parameters using the "display" library of variables
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // This function displays the blue paddle and sets parameters using the "display" library of variables
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // This function displays the bricks and sets parameters using the "bricks" library of variables 
    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }


// Game Functions
    // 1: This function clears the canvas every time draw() is called to remove old instances of functions in section 2 below
    // 2: It calls the drawBricks(), drawBall(), drawPaddle(), drawScore(), and collisionDetection() functions
    // 3: It ensures the ball bounces within the canvas using the maths
    // 4: It ensures game over status if the ball goes down off the canvas
    // 5: It moves the paddle left & right when the corresponding keys are pressed using the "rightPressed" / "leftPressed" variables & the keystroke functions
    // 6: It adds the value of dx to x, which changes the x and y position of the drawBall() function every time the draw() function is called
    function draw() {
        // 1
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 2
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        // 3
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy -10 < ballRadius) {
            dy = -dy;
        } else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            // 4
            else {
                lives--;
                if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 1;
                    dy = -1;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }
        // 5
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 4;
        }
        else if(leftPressed & paddleX > 0) {
            paddleX -= 4;
        }
        // 6
        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }


    draw();