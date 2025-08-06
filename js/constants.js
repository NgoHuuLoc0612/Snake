// Game constants
const GAME_CONFIG = {
    CANVAS_WIDTH: 400,
    CANVAS_HEIGHT: 400,
    GRID_SIZE: 20,
    INITIAL_SNAKE_LENGTH: 3,
    FOOD_SIZE: 18,
    SNAKE_SIZE: 18
};

// Grid dimensions
const GRID = {
    WIDTH: GAME_CONFIG.CANVAS_WIDTH / GAME_CONFIG.GRID_SIZE,
    HEIGHT: GAME_CONFIG.CANVAS_HEIGHT / GAME_CONFIG.GRID_SIZE
};

// Directions
const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// Key codes
const KEYS = {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    SPACE: ' ',
    W: 'w',
    A: 'a',
    S: 's',
    D: 'd'
};

// Game states
const GAME_STATES = {
    WAITING: 'waiting',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
};

// Difficulty settings
const DIFFICULTIES = {
    easy: { speed: 200, scoreMultiplier: 1 },
    medium: { speed: 150, scoreMultiplier: 1.5 },
    hard: { speed: 100, scoreMultiplier: 2 },
    expert: { speed: 70, scoreMultiplier: 3 }
};

// Local storage keys
const STORAGE_KEYS = {
    HIGH_SCORE: 'snakeHighScore',
    SETTINGS: 'snakeSettings'
};