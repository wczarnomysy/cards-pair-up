import { MemoryGame } from './game';
import './style.css';

/**
 * Application entry point
 * Initializes the game when DOM is ready and sets up event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('game-grid');
  const matches = document.getElementById('matches');
  const totalMatches = document.getElementById('total-matches');
  const tries = document.getElementById('tries');
  const resetBtn = document.getElementById('reset-btn');

  // Validate all required DOM elements exist
  if (!grid || !matches || !totalMatches || !tries || !resetBtn) {
    console.error('Required DOM elements not found. Cannot initialize game.');
    return;
  }

  const game = new MemoryGame(grid, matches, tries, totalMatches);
  game.init();

  resetBtn.addEventListener('click', () => {
    game.init();
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    game.destroy();
  });
});
