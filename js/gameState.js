// Game state management
class GameState {
    constructor() {
        this.state = GAME_STATES.WAITING;
        this.score = 0;
        this.highScore = 0;
        this.difficulty = 'medium';
        this.theme = 'classic';
        this.gameSpeed = DIFFICULTIES.medium.speed;
        this.scoreMultiplier = DIFFICULTIES.medium.scoreMultiplier;
        this.loadSettings();
    }

    loadSettings() {
        const savedHighScore = Utils.loadFromStorage(STORAGE_KEYS.HIGH_SCORE, 0);
        const savedSettings = Utils.loadFromStorage(STORAGE_KEYS.SETTINGS, {
            difficulty: 'medium',
            theme: 'classic'
        });

        this.highScore = savedHighScore;
        this.difficulty = savedSettings.difficulty;
        this.theme = savedSettings.theme;
        this.updateDifficultySettings();
    }

    saveSettings() {
        Utils.saveToStorage(STORAGE_KEYS.HIGH_SCORE, this.highScore);
        Utils.saveToStorage(STORAGE_KEYS.SETTINGS, {
            difficulty: this.difficulty,
            theme: this.theme
        });
    }

    updateDifficultySettings() {
        const difficultyConfig = DIFFICULTIES[this.difficulty];
        this.gameSpeed = difficultyConfig.speed;
        this.scoreMultiplier = difficultyConfig.scoreMultiplier;
    }

    setState(newState) {
        this.state = newState;
    }

    getState() {
        return this.state;
    }

    isPlaying() {
        return this.state === GAME_STATES.PLAYING;
    }

    isPaused() {
        return this.state === GAME_STATES.PAUSED;
    }

    isGameOver() {
        return this.state === GAME_STATES.GAME_OVER;
    }

    isWaiting() {
        return this.state === GAME_STATES.WAITING;
    }

    addScore(points) {
        this.score += Math.floor(points * this.scoreMultiplier);
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveSettings();
        }
    }

    resetScore() {
        this.score = 0;
    }

    resetHighScore() {
        this.highScore = 0;
        this.saveSettings();
    }

    setDifficulty(difficulty) {
        if (DIFFICULTIES[difficulty]) {
            this.difficulty = difficulty;
            this.updateDifficultySettings();
            this.saveSettings();
        }
    }

    setTheme(theme) {
        this.theme = theme;
        this.saveSettings();
    }

    getScore() {
        return this.score;
    }

    getHighScore() {
        return this.highScore;
    }

    getDifficulty() {
        return this.difficulty;
    }

    getTheme() {
        return this.theme;
    }

    getGameSpeed() {
        return this.gameSpeed;
    }

    reset() {
        this.resetScore();
        this.setState(GAME_STATES.WAITING);
    }
}