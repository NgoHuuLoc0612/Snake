// Main game engine
class GameEngine {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.renderer = new Renderer(this.canvas);
        this.gameState = new GameState();
        this.snake = new Snake();
        this.food = new Food();
        this.inputHandler = new InputHandler(this);
        
        this.gameLoop = null;
        this.lastUpdateTime = 0;
        this.accumulator = 0;
        
        this.initialize();
    }

    initialize() {
        this.renderer.drawStartScreen(this.gameState.getTheme());
        this.applyTheme(this.gameState.getTheme());
    }

    start() {
        if (this.gameState.isWaiting() || this.gameState.isGameOver()) {
            this.reset();
            this.gameState.setState(GAME_STATES.PLAYING);
            this.food.generateNewFood(this.snake.body);
            this.startGameLoop();
        }
    }

    pause() {
        if (this.gameState.isPlaying()) {
            this.gameState.setState(GAME_STATES.PAUSED);
            this.stopGameLoop();
        }
    }

    resume() {
        if (this.gameState.isPaused()) {
            this.gameState.setState(GAME_STATES.PLAYING);
            this.startGameLoop();
        }
    }

    togglePause() {
        if (this.gameState.isPlaying()) {
            this.pause();
        } else if (this.gameState.isPaused()) {
            this.resume();
        }
    }

    reset() {
        this.stopGameLoop();
        this.snake.reset();
        this.gameState.reset();
        this.inputHandler.clearBuffer();
        this.renderer.drawStartScreen(this.gameState.getTheme());
    }

    gameOver() {
        this.gameState.setState(GAME_STATES.GAME_OVER);
        this.stopGameLoop();
        this.inputHandler.clearBuffer();
    }

    startGameLoop() {
        this.lastUpdateTime = performance.now();
        this.accumulator = 0;
        this.gameLoop = requestAnimationFrame(this.update.bind(this));
    }

    stopGameLoop() {
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
            this.gameLoop = null;
        }
    }

    update(currentTime) {
        if (!this.gameState.isPlaying()) {
            return;
        }

        const deltaTime = currentTime - this.lastUpdateTime;
        this.lastUpdateTime = currentTime;
        this.accumulator += deltaTime;

        const targetFrameTime = this.gameState.getGameSpeed();

        while (this.accumulator >= targetFrameTime) {
            this.fixedUpdate();
            this.accumulator -= targetFrameTime;
        }

        this.render();
        this.gameLoop = requestAnimationFrame(this.update.bind(this));
    }

    fixedUpdate() {
        // Update snake position
        this.snake.update();

        // Check collisions
        if (this.checkCollisions()) {
            return;
        }

        // Check food collision
        if (this.snake.checkFoodCollision(this.food)) {
            this.handleFoodCollision();
        }
    }

    checkCollisions() {
        if (this.snake.checkWallCollision() || this.snake.checkSelfCollision()) {
            this.gameOver();
            return true;
        }
        return false;
    }

    handleFoodCollision() { 
    this.snake.grow();
    this.gameState.addScore(this.food.getPoints());
    
    // Generate new food immediately after eating
    this.food.generateNewFood(this.snake.body);
}

    render() {
        this.renderer.render(
            this.snake, 
            this.food, 
            this.gameState.getTheme()
        );
    }

    setDifficulty(difficulty) {
        this.gameState.setDifficulty(difficulty);
    }

    setTheme(theme) {
        this.gameState.setTheme(theme);
        this.applyTheme(theme);
    }

    applyTheme(theme) {
        document.body.className = `theme-${theme}`;
    }

    getGameState() {
        return this.gameState;
    }
}