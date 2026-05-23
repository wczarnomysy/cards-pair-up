import { MemoryGame } from './game';
import { UI_TEXT } from './constants';
import './style.css';

/**
 * Displays a critical error to the user when the app cannot initialize.
 * Uses DOM manipulation (no innerHTML) to avoid inline event handlers and XSS risk.
 */
function displayCriticalError(title: string, message: string): void {
  if (import.meta.env.DEV) {
    console.error(`[Critical Error] ${title}: ${message}`);
  }

  const errorContainer = document.createElement('div');
  errorContainer.setAttribute('role', 'alert');
  errorContainer.setAttribute('aria-live', 'assertive');
  errorContainer.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
    color: #ffffff;
    padding: 2rem 3rem;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 500px;
    width: 90%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    z-index: 10000;
  `;

  const iconEl = document.createElement('div');
  iconEl.style.cssText = 'font-size: 3rem; margin-bottom: 1rem;';
  iconEl.textContent = '⚠️';

  const titleEl = document.createElement('h2');
  titleEl.style.cssText = 'margin: 0 0 1rem 0; font-size: 1.5rem; font-weight: 600;';
  titleEl.textContent = title;

  const messageEl = document.createElement('p');
  messageEl.style.cssText =
    'margin: 0 0 1.5rem 0; font-size: 1rem; line-height: 1.5; opacity: 0.95;';
  messageEl.textContent = message;

  const reloadBtn = document.createElement('button');
  reloadBtn.textContent = 'Reload Page';
  reloadBtn.style.cssText = `
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.4);
    color: #ffffff;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  `;
  reloadBtn.addEventListener('mouseover', () => {
    reloadBtn.style.background = 'rgba(255, 255, 255, 0.3)';
  });
  reloadBtn.addEventListener('mouseout', () => {
    reloadBtn.style.background = 'rgba(255, 255, 255, 0.2)';
  });
  reloadBtn.addEventListener('click', () => window.location.reload());

  errorContainer.appendChild(iconEl);
  errorContainer.appendChild(titleEl);
  errorContainer.appendChild(messageEl);
  errorContainer.appendChild(reloadBtn);
  document.body.appendChild(errorContainer);
}

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
  const totalTries = document.getElementById('total-tries');
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
    !totalTries ||
    !resetBtn
  ) {
    displayCriticalError(
      'Game Initialization Failed',
      'Unable to load the game. Please refresh the page or contact support if the issue persists.'
    );
    return;
  }

  // Initialize UI text from constants (single source of truth)
  gameTitle.textContent = UI_TEXT.GAME_TITLE;
  matchesLabel.textContent = UI_TEXT.MATCHES_LABEL;
  triesLabel.textContent = UI_TEXT.TRIES_LABEL;
  resetBtn.textContent = UI_TEXT.RESTART_BUTTON;

  const game = new MemoryGame(grid, matches, tries, totalMatches, totalTries);
  game.init();

  resetBtn.addEventListener('click', () => {
    game.init();
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    game.destroy();
  });
});
