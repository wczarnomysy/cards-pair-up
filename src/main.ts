import { MemoryGame } from './game';
import { UI_TEXT } from './constants';
import './style.css';

/**
 * Application entry point
 * Initializes the game when DOM is ready and sets up event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
  const gameTitle = document.getElementById('game-title');
  const grid = document.getElementById('game-grid');
  const matchesLabel = document.getElementById('matches-label');
  const matches = document.getElementById('matches');
  const totalMatches = document.getElementById('total-matches');
  const triesLabel = document.getElementById('tries-label');
  const tries = document.getElementById('tries');
  const resetBtn = document.getElementById('reset-btn');

  // Validate all required DOM elements exist
  if (
    !gameTitle ||
    !grid ||
    !matchesLabel ||
    !matches ||
    !totalMatches ||
    !triesLabel ||
    !tries ||
    !resetBtn
  ) {
    console.error('Required DOM elements not found. Cannot initialize game.');
    return;
  }

  // Initialize UI text from constants (single source of truth)
  gameTitle.textContent = UI_TEXT.GAME_TITLE;
  matchesLabel.textContent = `${UI_TEXT.MATCHES_LABEL} `;
  triesLabel.textContent = `${UI_TEXT.TRIES_LABEL} `;
  resetBtn.textContent = UI_TEXT.RESTART_BUTTON;

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
