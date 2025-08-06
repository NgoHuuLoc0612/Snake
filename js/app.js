// Main application entry point
class SnakeApp {
    constructor() {
        this.gameEngine = null;
        this.ui = null;
        this.themeManager = new ThemeManager();
        this.initialize();
    }

    initialize() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setup();
            });
        } else {
            this.setup();
        }
    }

    setup() {
        try {
            // Initialize game engine
            this.gameEngine = new GameEngine();
            
            // Initialize UI
            this.ui = new UI(this.gameEngine);
            
            // Setup theme manager
            this.setupThemeManager();
            
            // Setup error handling
            this.setupErrorHandling();
            
            // Setup visibility change handling
            this.setupVisibilityHandling();
            
            // Setup resize handling
            this.setupResizeHandling();
            
            // Show welcome message
            this.showWelcomeMessage();
            
            console.log('Snake game initialized successfully!');
        } catch (error) {
            console.error('Failed to initialize Snake game:', error);
            this.showErrorMessage('Failed to load the game. Please refresh the page.');
        }
    }

    setupThemeManager() {
        // Apply saved theme
        const savedTheme = this.gameEngine.gameState.getTheme();
        this.themeManager.setTheme(savedTheme);
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Game error:', event.error);
            this.ui.showNotification('An error occurred. Game may not function properly.', 'error');
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    setupVisibilityHandling() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.gameEngine.gameState.isPlaying()) {
                this.gameEngine.pause();
                this.ui.showNotification('Game paused - tab not visible', 'info');
            }
        });
    }

    setupResizeHandling() {
        window.addEventListener('resize', Utils.debounce(() => {
            // Handle responsive behavior if needed
            this.handleResize();
        }, 250));
    }

    handleResize() {
        // Add any resize logic here
        const container = document.querySelector('.game-container');
        if (window.innerWidth < 768) {
            container.classList.add('mobile-layout');
        } else {
            container.classList.remove('mobile-layout');
        }
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.ui.showNotification('Welcome to Snake Game! Use arrow keys to control the snake.', 'info', 4000);
        }, 1000);
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #e74c3c;
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            z-index: 9999;
            font-family: Arial, sans-serif;
        `;
        errorDiv.innerHTML = `
            <h3>Error</h3>
            <p>${message}</p>
            <button onclick="location.reload()" style="
                background: white;
                color: #e74c3c;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Reload Page</button>
        `;
        document.body.appendChild(errorDiv);
    }

    // Public API methods
    getGameEngine() {
        return this.gameEngine;
    }

    getUI() {
        return this.ui;
    }

    getThemeManager() {
        return this.themeManager;
    }
}

// Initialize the application
let snakeApp;

// Start the application when the script loads
(() => {
    snakeApp = new SnakeApp();
})();

// Export for potential external access
if (typeof window !== 'undefined') {
    window.SnakeApp = SnakeApp;
    window.snakeApp = snakeApp;
}