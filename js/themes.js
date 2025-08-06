// Theme management
const Themes = {
    classic: {
        name: 'Classic',
        colors: {
            background: '#ecf0f1',
            snake: '#2c3e50',
            food: '#27ae60',
            text: '#2c3e50',
            border: '#2c3e50'
        }
    },
    neon: {
        name: 'Neon',
        colors: {
            background: '#0a0a0a',
            snake: '#00ff41',
            food: '#ff0080',
            text: '#00ff41',
            border: '#00ff41'
        },
        effects: {
            glow: true,
            shadowBlur: 10
        }
    },
    dark: {
        name: 'Dark Mode',
        colors: {
            background: '#2c3e50',
            snake: '#3498db',
            food: '#e74c3c',
            text: '#ecf0f1',
            border: '#34495e'
        }
    },
    nature: {
        name: 'Nature',
        colors: {
            background: '#27ae60',
            snake: '#8b4513',
            food: '#ff6b35',
            text: '#ffffff',
            border: '#2ecc71'
        }
    }
};

class ThemeManager {
    constructor() {
        this.currentTheme = 'classic';
    }

    setTheme(themeName) {
        if (Themes[themeName]) {
            this.currentTheme = themeName;
            this.applyTheme();
        }
    }

    getCurrentTheme() {
        return Themes[this.currentTheme];
    }

    applyTheme() {
        const theme = this.getCurrentTheme();
        document.body.className = `theme-${this.currentTheme}`;
        
        // Apply custom CSS properties for dynamic theming
        const root = document.documentElement;
        root.style.setProperty('--theme-bg', theme.colors.background);
        root.style.setProperty('--theme-snake', theme.colors.snake);
        root.style.setProperty('--theme-food', theme.colors.food);
        root.style.setProperty('--theme-text', theme.colors.text);
        root.style.setProperty('--theme-border', theme.colors.border);
    }

    getAvailableThemes() {
        return Object.keys(Themes).map(key => ({
            value: key,
            name: Themes[key].name
        }));
    }
}