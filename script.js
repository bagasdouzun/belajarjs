const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [
    { x: gridSize * 5, y: gridSize * 5 },
    { x: gridSize * 4, y: gridSize * 5 },
    { x: gridSize * 3, y: gridSize * 5 }
];

let direction = { x: gridSize, y: 0 };
let food = { x: gridSize * 10, y: gridSize * 10 };
let score = 0;

document.addEventListener("keydown", changeDirection);
setInterval(gameLoop, 100);

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        resetGame();
        return;
    }
    if (checkFood()) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
        placeFood();
        growSnake();
    }
    clearCanvas();
    drawFood();
    drawSnake();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop();
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;

    if (keyPressed === 37 && !goingRight) {
        direction = { x: -gridSize, y: 0 };
    } else if (keyPressed === 38 && !goingDown) {
        direction = { x: 0, y: -gridSize };
    } else if (keyPressed === 39 && !goingLeft) {
        direction = { x: gridSize, y: 0 };
    } else if (keyPressed === 40 && !goingUp) {
        direction = { x: 0, y: gridSize };
    }
}

function checkCollision() {
    const head = snake[0];
    const hitWall = head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height;
    const hitSelf = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);

    return hitWall || hitSelf;
}

function resetGame() {
    snake = [
        { x: gridSize * 5, y: gridSize * 5 },
        { x: gridSize * 4, y: gridSize * 5 },
        { x: gridSize * 3, y: gridSize * 5 }
    ];
    direction = { x: gridSize, y: 0 };
    score = 0;
    document.getElementById("score").textContent = `Score: ${score}`;
    placeFood();
}

function checkFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * canvasSize / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvasSize / gridSize) * gridSize
    };
}

function growSnake() {
    const tail = snake[snake.length - 1];
    snake.push(tail);
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}
