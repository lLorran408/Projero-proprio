// O "Palco" do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');

// Constantes do Jogo
const TILE_SIZE = 20; // Tamanho de cada bloco (cobra/comida)
const COLS = canvas.width / TILE_SIZE;
const ROWS = canvas.height / TILE_SIZE;
let gameLoopInterval;
let score = 0;
let isPlaying = false;

// Estado da Cobra
let snake = [];
let dx = 0; // Velocidade em X
let dy = 0; // Velocidade em Y

// Posição da Comida
let foodX, foodY;

// Função para Iniciar/Resetar o Jogo
function initGame() {
    // Posição inicial da cobra
    snake = [{ x: 6, y: 10 }, { x: 5, y: 10 }, { x: 4, y: 10 }];
    dx = 1; // Começa movendo para a direita
    dy = 0;
    score = 0;
    scoreDisplay.textContent = 'Pontuação: 0';
    isPlaying = true;

    // Coloca a comida
    placeFood();
    
    // Inicia o loop principal do jogo (a cada 100ms)
    clearInterval(gameLoopInterval); // Limpa qualquer anterior
    gameLoopInterval = setInterval(gameLoop, 100); 
}

// Coloca a comida em uma posição aleatória que não esteja na cobra
function placeFood() {
    let newFoodX, newFoodY;
    let placedOnSnake;
    do {
        newFoodX = Math.floor(Math.random() * COLS);
        newFoodY = Math.floor(Math.random() * ROWS);
        placedOnSnake = snake.some(segment => segment.x === newFoodX && segment.y === newFoodY);
    } while (placedOnSnake);

    foodX = newFoodX;
    foodY = newFoodY;
}

// Desenha a cobra e a comida
function draw() {
    // 1. Limpa o canvas
    ctx.fillStyle = '#a9d18e'; // Cor do fundo do tabuleiro (CSS)
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Desenha a Comida
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX * TILE_SIZE, foodY * TILE_SIZE, TILE_SIZE, TILE_SIZE);

    // 3. Desenha a Cobra
    ctx.fillStyle = '#38761d'; // Cor da cobra
    snake.forEach(segment => {
        ctx.fillRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
}

// Move a cobra e verifica colisões
function moveSnake() {
    // 1. Cria a nova cabeça
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // 2. Adiciona a nova cabeça ao início da cobra
    snake.unshift(head);

    // 3. Verifica se comeu a comida
    if (head.x === foodX && head.y === foodY) {
        score += 10;
        scoreDisplay.textContent = `Pontuação: ${score}`;
        placeFood(); // Coloca nova comida
        // NÃO removemos a cauda, então a cobra cresce
    } else {
        // Se não comeu, remove a cauda (a cobra não cresce)
        snake.pop();
    }
}

// Verifica se a cobra colidiu com a parede ou com ela mesma
function checkCollision() {
    const head = snake[0];
    
    // Colisão com a parede
    const hitWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;

    // Colisão com o próprio corpo (começa a verificar a partir do 4º segmento)
    const hitSelf = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);

    if (hitWall || hitSelf) {
        gameOver();
        return true;
    }
    return false;
}

// Lógica principal do jogo
function gameLoop() {
    if (!isPlaying) return;

    moveSnake();
    if (!checkCollision()) {
        draw();
    }
}

// Fim do Jogo
function gameOver() {
    clearInterval(gameLoopInterval);
    isPlaying = false;
    alert(`Fim de Jogo! Sua pontuação: ${score}`);
}

// Controla o movimento da cobra com as teclas de seta
function changeDirection(event) {
    if (!isPlaying) return;

    const keyPressed = event.key;
    const LEFT = 'ArrowLeft', UP = 'ArrowUp', RIGHT = 'ArrowRight', DOWN = 'ArrowDown';

    // Para evitar que a cobra se mova na direção oposta instantaneamente
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT && !goingRight) {
        dx = -1; dy = 0;
    } else if (keyPressed === UP && !goingDown) {
        dx = 0; dy = -1;
    } else if (keyPressed === RIGHT && !goingLeft) {
        dx = 1; dy = 0;
    } else if (keyPressed === DOWN && !goingUp) {
        dx = 0; dy = 1;
    }
}

// Eventos
document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', initGame);

// Desenha a tela inicial antes de começar o jogo
draw();