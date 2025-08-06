# Snake Game

A modern, feature-rich implementation of the classic Snake game built with vanilla JavaScript, HTML5 Canvas, and CSS3. This game features multiple themes, difficulty levels, responsive design, and smooth gameplay mechanics.

## 🎮 Features

### Core Gameplay
- **Classic Snake Mechanics**: Control a growing snake to eat food while avoiding walls and self-collision
- **Smooth Movement**: Optimized game loop with consistent frame rates
- **Input Buffering**: Advanced input handling that prevents missed keystrokes
- **Progressive Difficulty**: Snake grows longer with each food consumed

### Game Modes & Settings
- **Multiple Difficulty Levels**:
  - Easy (200ms speed, 1x score multiplier)
  - Medium (150ms speed, 1.5x score multiplier)
  - Hard (100ms speed, 2x score multiplier)
  - Expert (70ms speed, 3x score multiplier)

### Visual Themes
- **Classic Theme**: Traditional snake game appearance
- **Neon Theme**: Glowing snake and food with dark background
- **Dark Mode**: Modern dark theme with blue accents
- **Nature Theme**: Earth-toned colors with natural feel

### Food Types
- **Normal Food** (85% chance): Green circles worth 10 points
- **Bonus Food** (10% chance): Golden diamonds worth 50 points
- **Super Food** (5% chance): Red stars worth 100 points with sparkle effects

### User Interface
- **Responsive Design**: Adapts to different screen sizes
- **Real-time Score Display**: Current score and high score tracking
- **Game State Management**: Start, pause, resume, and game over screens
- **Visual Controls Guide**: On-screen control instructions
- **Settings Panel**: Easy difficulty and theme switching

## 🕹️ Controls

| Key | Action |
|-----|--------|
| **Arrow Keys** | Move snake (↑ ↓ ← →) |
| **WASD Keys** | Alternative movement controls |
| **Spacebar** | Pause/Resume game |
| **Enter** | Start game or restart after game over |

## 🚀 Getting Started

### Prerequisites
- Modern web browser with HTML5 Canvas support
- No additional dependencies required

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/Snake.git
   cd Snake
   ```

2. **Open the game**:
   - Simply open `index.html` in your web browser
   - Or use a local web server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

3. **Start playing**:
   - Click "Start Game" or press Enter
   - Use arrow keys or WASD to control the snake
   - Eat food to grow and increase your score!

## 📁 Project Structure

```
Snake/
├── index.html              # Main HTML file
├── LICENSE                 # MIT License file
├── README.md              # Project documentation
├── css/                   # Stylesheets
│   ├── styles.css         # Main styles and layout
│   ├── game.css          # Game area specific styles
│   └── ui.css            # UI controls and components
└── js/                   # JavaScript modules
    ├── app.js            # Main application entry point
    ├── constants.js      # Game constants and configuration
    ├── utils.js          # Utility functions
    ├── food.js           # Food generation and rendering
    ├── snake.js          # Snake logic and rendering
    ├── gameState.js      # Game state management
    ├── renderer.js       # Canvas rendering engine
    ├── inputHandler.js   # Input processing and buffering
    ├── gameEngine.js     # Core game loop and logic
    ├── ui.js             # User interface management
    └── themes.js         # Theme definitions and management
```

## 🎯 Gameplay Mechanics

### Snake Movement
- Snake moves continuously in the current direction
- Direction changes are queued to prevent missed inputs
- Cannot reverse directly into the snake's body
- Collision detection for walls and self-intersection

### Food System
- Food spawns randomly on empty grid positions
- Different food types provide varying point values
- Special food items have unique visual effects
- Immediate respawn after consumption

### Scoring System
- Base points multiplied by difficulty level
- High score persistence using localStorage
- Real-time score updates during gameplay

### Game States
- **Waiting**: Initial state, ready to start
- **Playing**: Active gameplay with snake movement
- **Paused**: Game temporarily stopped, can be resumed
- **Game Over**: Snake collided, showing final score

## 🛠️ Technical Implementation

### Architecture
- **Modular Design**: Separated concerns with dedicated classes
- **Event-Driven**: Responsive to user inputs and game events
- **State Management**: Centralized game state handling
- **Rendering Pipeline**: Efficient Canvas 2D rendering

### Performance Optimizations
- Fixed timestep game loop for consistent gameplay
- Input buffering to handle rapid key presses
- Efficient collision detection algorithms
- Minimal DOM manipulation during gameplay

### Browser Compatibility
- Modern browsers (Chrome 60+, Firefox 55+, Safari 11+, Edge 79+)
- HTML5 Canvas API support required
- localStorage for settings persistence

## 🎨 Customization

### Adding New Themes
1. Define theme colors in `js/themes.js`:
   ```javascript
   newTheme: {
       name: 'New Theme',
       colors: {
           background: '#color',
           snake: '#color',
           food: '#color',
           text: '#color',
           border: '#color'
       }
   }
   ```

2. Add theme option to `index.html`:
   ```html
   <option value="newTheme">New Theme</option>
   ```

### Modifying Difficulty
Edit the `DIFFICULTIES` object in `js/constants.js`:
```javascript
DIFFICULTIES = {
    custom: { speed: 120, scoreMultiplier: 2.5 }
};
```

### Changing Game Dimensions
Modify `GAME_CONFIG` in `js/constants.js`:
```javascript
const GAME_CONFIG = {
    CANVAS_WIDTH: 600,    // Increase canvas size
    CANVAS_HEIGHT: 600,
    GRID_SIZE: 30,        // Larger grid cells
    // ... other settings
};
```

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

### Bug Reports
- Use the GitHub issue tracker
- Include browser version and steps to reproduce
- Provide screenshots if applicable

### Feature Requests
- Describe the feature and its benefits
- Consider implementation complexity
- Check existing issues first

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test thoroughly across different browsers
- Update documentation as needed

## 🐛 Known Issues

- None currently reported

## 📋 Future Enhancements

- [ ] Mobile touch controls
- [ ] Sound effects and background music
- [ ] Multiplayer support
- [ ] Power-ups and special abilities
- [ ] Level system with obstacles
- [ ] Leaderboard integration
- [ ] Achievement system
- [ ] Export/import game statistics

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Ngô Hữu Lộc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- Classic Snake game concept and mechanics
- Modern web development best practices
- HTML5 Canvas API documentation
- Open source community for inspiration and resources

## 📞 Support

If you encounter any issues or have questions:

1. Check the [FAQ section](#-known-issues)
2. Search existing [GitHub issues](https://github.com/NgoHuuLoc0612/Snake/issues)
3. Create a new issue with detailed information
4. Contact the maintainer via email

---

**Enjoy playing Snake! 🐍**

Made with ❤️ by [Ngô Hữu Lộc](https://github.com/NgoHuuLoc0612)
