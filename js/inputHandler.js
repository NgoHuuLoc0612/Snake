// Input handling
class InputHandler {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.keyBuffer = [];
        this.maxBufferSize = 3;
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        
        // Prevent arrow keys from scrolling the page
        document.addEventListener('keydown', (e) => {
            if ([KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT].includes(e.key)) {
                e.preventDefault();
            }
        });
    }

    handleKeyDown(event) {
        const key = event.key.toLowerCase();
        
        // Handle pause/resume
        if (key === KEYS.SPACE.toLowerCase()) {
            event.preventDefault();
            this.gameEngine.togglePause();
            return;
        }

        // Only process movement keys during gameplay
        if (!this.gameEngine.gameState.isPlaying()) {
            return;
        }

        const direction = this.getDirectionFromKey(key);
        if (direction) {
            this.addToBuffer(direction);
            this.processBuffer();
        }
    }

    handleKeyUp(event) {
        // Handle any key release events if needed
    }

    getDirectionFromKey(key) {
        switch (key) {
            case KEYS.ARROW_UP.toLowerCase():
            case KEYS.W:
                return DIRECTIONS.UP;
            case KEYS.ARROW_DOWN.toLowerCase():
            case KEYS.S:
                return DIRECTIONS.DOWN;
            case KEYS.ARROW_LEFT.toLowerCase():
            case KEYS.A:
                return DIRECTIONS.LEFT;
            case KEYS.ARROW_RIGHT.toLowerCase():
            case KEYS.D:
                return DIRECTIONS.RIGHT;
            default:
                return null;
        }
    }

    addToBuffer(direction) {
        // Add direction to buffer, maintaining max size
        this.keyBuffer.push(direction);
        if (this.keyBuffer.length > this.maxBufferSize) {
            this.keyBuffer.shift();
        }
    }

    processBuffer() {
        if (this.keyBuffer.length === 0) return;

        const direction = this.keyBuffer.shift();
        this.gameEngine.snake.changeDirection(direction);
    }

    clearBuffer() {
        this.keyBuffer = [];
    }
}