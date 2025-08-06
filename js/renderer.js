// Game rendering
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = GAME_CONFIG.CANVAS_WIDTH;
        this.canvas.height = GAME_CONFIG.CANVAS_HEIGHT;
    }

    clear(theme = 'classic') {
        this.ctx.fillStyle = this.getBackgroundColor(theme);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (theme !== 'classic') {
            this.drawGrid(theme);
        }
    }

    drawGrid(theme) {
        this.ctx.strokeStyle = this.getGridColor(theme);
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.1;

        // Draw vertical lines
        for (let x = 0; x <= GRID.WIDTH; x++) {
            const xPos = x * GAME_CONFIG.GRID_SIZE;
            this.ctx.beginPath();
            this.ctx.moveTo(xPos, 0);
            this.ctx.lineTo(xPos, this.canvas.height);
            this.ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= GRID.HEIGHT; y++) {
            const yPos = y * GAME_CONFIG.GRID_SIZE;
            this.ctx.beginPath();
            this.ctx.moveTo(0, yPos);
            this.ctx.lineTo(this.canvas.width, yPos);
            this.ctx.stroke();
        }

        this.ctx.globalAlpha = 1;
    }

    getBackgroundColor(theme) {
        switch (theme) {
            case 'neon':
                return '#0a0a0a';
            case 'dark':
                return '#2c3e50';
            case 'nature':
                return '#27ae60';
            default:
                return '#ecf0f1';
        }
    }

    getGridColor(theme) {
        switch (theme) {
            case 'neon':
                return '#00ff41';
            case 'dark':
                return '#34495e';
            case 'nature':
                return '#2ecc71';
            default:
                return '#bdc3c7';
        }
    }

    render(snake, food, theme) {
        this.clear(theme);
        food.render(this.ctx, theme);
        snake.render(this.ctx, theme);
    }

    drawStartScreen(theme) {
        this.clear(theme);
        
        this.ctx.save();
        this.ctx.fillStyle = this.getTextColor(theme);
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            'Press START to begin!', 
            this.canvas.width / 2, 
            this.canvas.height / 2
        );
        this.ctx.restore();
    }

    getTextColor(theme) {
        switch (theme) {
            case 'neon':
                return '#00ff41';
            case 'dark':
                return '#ecf0f1';
            case 'nature':
                return '#ffffff';
            default:
                return '#2c3e50';
        }
    }
}