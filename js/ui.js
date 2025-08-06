// UI management
class UI {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.elements = this.getUIElements();
        this.bindEvents();
        this.updateDisplay();
        this.startDisplayUpdateLoop();
    }

    getUIElements() {
        return {
            currentScore: document.getElementById('current-score'),
            highScore: document.getElementById('high-score'),
            finalScore: document.getElementById('final-score'),
            gameOverScreen: document.getElementById('game-over-screen'),
            pauseScreen: document.getElementById('pause-screen'),
            startBtn: document.getElementById('start-btn'),
            restartBtn: document.getElementById('restart-btn'),
            resetBtn: document.getElementById('reset-btn'),
            difficultySelect: document.getElementById('difficulty'),
            themeSelect: document.getElementById('theme')
        };
    }

    bindEvents() {
        // Button events
        this.elements.startBtn.addEventListener('click', () => {
            this.gameEngine.start();
        });

        this.elements.restartBtn.addEventListener('click', () => {
            this.hideGameOverScreen();
            this.gameEngine.start();
        });

        this.elements.resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset your high score?')) {
                this.gameEngine.gameState.resetHighScore();
                this.updateDisplay();
            }
        });

        // Settings events
        this.elements.difficultySelect.addEventListener('change', (e) => {
            this.gameEngine.setDifficulty(e.target.value);
        });

        this.elements.themeSelect.addEventListener('change', (e) => {
            this.gameEngine.setTheme(e.target.value);
        });

        // Keyboard events for menus
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (this.gameEngine.gameState.isWaiting()) {
                    this.gameEngine.start();
                } else if (this.gameEngine.gameState.isGameOver()) {
                    this.hideGameOverScreen();
                    this.gameEngine.start();
                }
            }
        });
    }

    startDisplayUpdateLoop() {
        setInterval(() => {
            this.updateDisplay();
        }, 100);
    }

    updateDisplay() {
        const gameState = this.gameEngine.gameState;
        
        // Update scores
        this.elements.currentScore.textContent = Utils.formatScore(gameState.getScore());
        this.elements.highScore.textContent = Utils.formatScore(gameState.getHighScore());

        // Update settings selects
        this.elements.difficultySelect.value = gameState.getDifficulty();
        this.elements.themeSelect.value = gameState.getTheme();

        // Handle game state UI changes
        this.handleGameStateUI(gameState.getState());
    }

    handleGameStateUI(state) {
        switch (state) {
            case GAME_STATES.WAITING:
                this.hideAllScreens();
                this.elements.startBtn.disabled = false;
                break;
            case GAME_STATES.PLAYING:
                this.hideAllScreens();
                this.elements.startBtn.disabled = true;
                break;
            case GAME_STATES.PAUSED:
                this.showPauseScreen();
                break;
            case GAME_STATES.GAME_OVER:
                this.showGameOverScreen();
                this.elements.startBtn.disabled = false;
                break;
        }
    }

    showGameOverScreen() {
        const finalScore = this.gameEngine.gameState.getScore();
        this.elements.finalScore.textContent = Utils.formatScore(finalScore);
        this.elements.gameOverScreen.classList.remove('hidden');
    }

    hideGameOverScreen() {
        this.elements.gameOverScreen.classList.add('hidden');
    }

    showPauseScreen() {
        this.elements.pauseScreen.classList.remove('hidden');
    }

    hidePauseScreen() {
        this.elements.pauseScreen.classList.add('hidden');
    }

    hideAllScreens() {
        this.hideGameOverScreen();
        this.hidePauseScreen();
    }

    showNotification(message, type = 'info', duration = 3000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#27ae60';
                break;
            case 'error':
                notification.style.backgroundColor = '#e74c3c';
                break;
            case 'warning':
                notification.style.backgroundColor = '#f39c12';
                break;
            default:
                notification.style.backgroundColor = '#3498db';
        }

        // Add to DOM and animate in
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after duration
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
}