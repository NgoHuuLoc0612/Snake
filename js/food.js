// Food management - Fixed for instant generation
class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.type = 'normal';
        this.points = 10;
        this.generateNewFood();
    }

    generateNewFood(snakeBody = []) {
        // Generate new position immediately
        this.position = this.findValidPosition(snakeBody);
        this.generateFoodType();
    }

    findValidPosition(snakeBody) {
        // Get all occupied positions
        const occupiedPositions = new Set();
        snakeBody.forEach(segment => {
            occupiedPositions.add(`${segment.x},${segment.y}`);
        });

        // Get all possible positions
        const availablePositions = [];
        for (let x = 0; x < GRID.WIDTH; x++) {
            for (let y = 0; y < GRID.HEIGHT; y++) {
                const posKey = `${x},${y}`;
                if (!occupiedPositions.has(posKey)) {
                    availablePositions.push({ x, y });
                }
            }
        }

        // If no available positions (shouldn't happen in normal gameplay)
        if (availablePositions.length === 0) {
            return { x: 0, y: 0 };
        }

        // Return random available position
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        return availablePositions[randomIndex];
    }

    generateFoodType() {
        const random = Math.random();
        
        if (random < 0.05) {
            // 5% chance for super bonus
            this.type = 'super';
            this.points = 100;
        } else if (random < 0.15) {
            // 10% chance for bonus food (15% - 5% = 10%)
            this.type = 'bonus';
            this.points = 50;
        } else {
            // 85% chance for normal food
            this.type = 'normal';
            this.points = 10;
        }
    }

    getColor() {
        switch (this.type) {
            case 'bonus':
                return '#f39c12';
            case 'super':
                return '#e74c3c';
            default:
                return '#27ae60';
        }
    }

    getPoints() {
        return this.points;
    }

    render(ctx, theme) {
        const x = this.position.x * GAME_CONFIG.GRID_SIZE;
        const y = this.position.y * GAME_CONFIG.GRID_SIZE;
        const size = GAME_CONFIG.FOOD_SIZE;
        const offset = (GAME_CONFIG.GRID_SIZE - size) / 2;

        ctx.save();
        
        // Add glow effect for neon theme
        if (theme === 'neon') {
            ctx.shadowColor = this.getColor();
            ctx.shadowBlur = 10;
        }

        // Draw food based on type
        ctx.fillStyle = this.getColor();
        
        if (this.type === 'normal') {
            // Circle for normal food
            ctx.beginPath();
            ctx.arc(
                x + GAME_CONFIG.GRID_SIZE / 2,
                y + GAME_CONFIG.GRID_SIZE / 2,
                size / 2,
                0,
                2 * Math.PI
            );
            ctx.fill();
        } else if (this.type === 'bonus') {
            // Diamond shape for bonus food
            ctx.beginPath();
            const centerX = x + GAME_CONFIG.GRID_SIZE / 2;
            const centerY = y + GAME_CONFIG.GRID_SIZE / 2;
            const halfSize = size / 2;
            
            ctx.moveTo(centerX, centerY - halfSize);
            ctx.lineTo(centerX + halfSize, centerY);
            ctx.lineTo(centerX, centerY + halfSize);
            ctx.lineTo(centerX - halfSize, centerY);
            ctx.closePath();
            ctx.fill();
            
            // Add sparkle effect
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(centerX - 3, centerY - 3, 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(centerX + 3, centerY + 3, 2, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            // Star shape for super food
            this.drawStar(ctx, x + GAME_CONFIG.GRID_SIZE / 2, y + GAME_CONFIG.GRID_SIZE / 2, size / 2);
            
            // Add multiple sparkle effects
            ctx.fillStyle = 'white';
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI) / 2;
                const sparkleX = x + GAME_CONFIG.GRID_SIZE / 2 + Math.cos(angle) * 6;
                const sparkleY = y + GAME_CONFIG.GRID_SIZE / 2 + Math.sin(angle) * 6;
                ctx.beginPath();
                ctx.arc(sparkleX, sparkleY, 1.5, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        ctx.restore();
    }

    drawStar(ctx, centerX, centerY, radius) {
        const spikes = 5;
        const outerRadius = radius;
        const innerRadius = radius * 0.5;
        
        ctx.beginPath();
        
        for (let i = 0; i < spikes * 2; i++) {
            const angle = (i * Math.PI) / spikes;
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fill();
    }
}