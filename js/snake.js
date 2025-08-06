// Snake management
class Snake {
    constructor() {
        this.body = [];
        this.direction = { ...DIRECTIONS.RIGHT };
        this.nextDirection = { ...DIRECTIONS.RIGHT };
        this.growing = false;
        this.reset();
    }

    reset() {
        const centerX = Math.floor(GRID.WIDTH / 2);
        const centerY = Math.floor(GRID.HEIGHT / 2);
        
        this.body = [];
        for (let i = GAME_CONFIG.INITIAL_SNAKE_LENGTH - 1; i >= 0; i--) {
            this.body.push({
                x: centerX - i,
                y: centerY
            });
        }
        
        this.direction = { ...DIRECTIONS.RIGHT };
        this.nextDirection = { ...DIRECTIONS.RIGHT };
        this.growing = false;
    }

    update() {
        // Update direction
        if (!this.isOppositeDirection(this.nextDirection)) {
            this.direction = { ...this.nextDirection };
        }

        // Calculate new head position
        const head = { ...this.body[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;

        // Add new head
        this.body.unshift(head);

        // Remove tail if not growing
        if (!this.growing) {
            this.body.pop();
        } else {
            this.growing = false;
        }
    }

    grow() {
        this.growing = true;
    }

    changeDirection(newDirection) {
        // Prevent immediate reverse direction
        if (!this.isOppositeDirection(newDirection)) {
            this.nextDirection = { ...newDirection };
        }
    }

    isOppositeDirection(newDirection) {
        return (
            (this.direction.x === -newDirection.x && this.direction.x !== 0) ||
            (this.direction.y === -newDirection.y && this.direction.y !== 0)
        );
    }

    checkSelfCollision() {
        const head = this.body[0];
        return this.body.slice(1).some(segment => 
            Utils.positionsEqual(head, segment)
        );
    }

    checkWallCollision() {
        const head = this.body[0];
        return !Utils.isValidPosition(head);
    }

    checkFoodCollision(food) {
        return Utils.positionsEqual(this.body[0], food.position);
    }

    getLength() {
        return this.body.length;
    }

    render(ctx, theme) {
        this.body.forEach((segment, index) => {
            const x = segment.x * GAME_CONFIG.GRID_SIZE;
            const y = segment.y * GAME_CONFIG.GRID_SIZE;
            const size = GAME_CONFIG.SNAKE_SIZE;
            const offset = (GAME_CONFIG.GRID_SIZE - size) / 2;

            ctx.save();

            if (index === 0) {
                // Head
                ctx.fillStyle = this.getHeadColor(theme);
                if (theme === 'neon') {
                    ctx.shadowColor = ctx.fillStyle;
                    ctx.shadowBlur = 8;
                }
            } else {
                // Body
                ctx.fillStyle = this.getBodyColor(theme, index);
                if (theme === 'neon') {
                    ctx.shadowColor = ctx.fillStyle;
                    ctx.shadowBlur = 5;
                }
            }

            // Draw segment
            ctx.fillRect(x + offset, y + offset, size, size);

            // Add eyes to head
            if (index === 0) {
                this.drawEyes(ctx, x, y, size, offset);
            }

            ctx.restore();
        });
    }

    drawEyes(ctx, x, y, size, offset) {
        ctx.fillStyle = 'white';
        const eyeSize = 3;
        const eyeOffset = 4;

        // Determine eye positions based on direction
        let leftEyeX, leftEyeY, rightEyeX, rightEyeY;

        if (this.direction.x === 1) { // Moving right
            leftEyeX = x + offset + size - eyeOffset;
            leftEyeY = y + offset + eyeOffset;
            rightEyeX = x + offset + size - eyeOffset;
            rightEyeY = y + offset + size - eyeOffset;
        } else if (this.direction.x === -1) { // Moving left
            leftEyeX = x + offset + eyeOffset;
            leftEyeY = y + offset + eyeOffset;
            rightEyeX = x + offset + eyeOffset;
            rightEyeY = y + offset + size - eyeOffset;
        } else if (this.direction.y === -1) { // Moving up
            leftEyeX = x + offset + eyeOffset;
            leftEyeY = y + offset + eyeOffset;
            rightEyeX = x + offset + size - eyeOffset;
            rightEyeY = y + offset + eyeOffset;
        } else { // Moving down
            leftEyeX = x + offset + eyeOffset;
            leftEyeY = y + offset + size - eyeOffset;
            rightEyeX = x + offset + size - eyeOffset;
            rightEyeY = y + offset + size - eyeOffset;
        }

        // Draw eyes
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, eyeSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(rightEyeX, rightEyeY, eyeSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        // Draw pupils
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, 1, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(rightEyeX, rightEyeY, 1, 0, 2 * Math.PI);
        ctx.fill();
    }

    getHeadColor(theme) {
        switch (theme) {
            case 'neon':
                return '#00ff41';
            case 'dark':
                return '#3498db';
            case 'nature':
                return '#8b4513';
            default:
                return '#2c3e50';
        }
    }

    getBodyColor(theme, index) {
        const alpha = Math.max(0.3, 1 - (index * 0.05));
        
        switch (theme) {
            case 'neon':
                return `rgba(0, 255, 65, ${alpha})`;
            case 'dark':
                return `rgba(52, 152, 219, ${alpha})`;
            case 'nature':
                return `rgba(139, 69, 19, ${alpha})`;
            default:
                return `rgba(44, 62, 80, ${alpha})`;
        }
    }
}