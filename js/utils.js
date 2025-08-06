// Utility functions
const Utils = {
    // Generate random integer between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Generate random position within grid bounds
    randomGridPosition() {
        return {
            x: this.randomInt(0, GRID.WIDTH - 1),
            y: this.randomInt(0, GRID.HEIGHT - 1)
        };
    },

    // Check if two positions are equal
    positionsEqual(pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    },

    // Check if position is within grid bounds
    isValidPosition(pos) {
        return pos.x >= 0 && pos.x < GRID.WIDTH && 
               pos.y >= 0 && pos.y < GRID.HEIGHT;
    },

    // Deep clone an object
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Local storage helpers
    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
        }
    },

    loadFromStorage(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.warn('Failed to load from localStorage:', error);
            return defaultValue;
        }
    },

    // Format score with leading zeros
    formatScore(score, digits = 4) {
        return score.toString().padStart(digits, '0');
    }
};