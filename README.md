# 🎮 Cards Pair Up

A modern, accessible memory card matching game built with TypeScript and Vite. Match all 8 fantasy-themed card pairs with only 6 tries in this responsive, keyboard-friendly game.

## 🎯 Features

- **8 Unique Card Pairs** - Fantasy-themed FontAwesome icons
- **6 Tries Challenge** - Strategic gameplay with limited mistakes
- **Fully Responsive** - Works on desktop, tablet, and mobile
- **Keyboard Accessible** - WCAG compliant with full keyboard navigation
- **Smooth Animations** - Polished card flip effects and transitions
- **Type-Safe** - Built with TypeScript strict mode
- **Fully Tested** - Test Suites with comprehensive coverage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 to play the game.

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run lint:fix` - Fix auto-fixable ESLint issues
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are properly formatted
- `npm test` - Run all tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🧪 Testing

The game includes comprehensive test coverage:

- **Game Logic** - Card flipping, matching, tries system
- **Components** - Modal dialogs, accessibility features
- **Utilities** - Card generation and game state management

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🏗️ Tech Stack

- **TypeScript 5.9** - Type safety and better DX
- **Vite 7.3** - Fast build tool and dev server
- **Jest 29** - Testing framework with JSDOM
- **ESLint 10** - Code quality and error detection
- **Prettier** - Consistent code formatting
- **FontAwesome 7.2** - Beautiful card icons
- **CSS3** - Modern styling with animations and responsive design

## 📁 Project Structure

```
src/
├── __tests__/     # Test files for all components
├── constants.ts   # Game configuration and messages
├── utils.ts       # Card generation utilities
├── game.ts        # Core game logic with Card types
├── modal.ts       # Reusable modal component
├── main.ts        # Application entry point
└── style.css      # Game styles and animations
```

## 🎮 How to Play

1. Click any card to flip it and reveal the icon
2. Find matching pairs by flipping two cards at a time
3. Matched pairs stay flipped - mismatches flip back
4. Match all 8 pairs before running out of 6 tries to win!

## 🚀 Deployment

### GitHub Pages (Automated)

This project includes GitHub Actions for automatic deployment:

1. Push to a GitHub repository
2. Enable Pages with "GitHub Actions" source
3. Every push to `main` automatically deploys your game
4. Live at: `https://your-username.github.io/cards-pair-up/`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
