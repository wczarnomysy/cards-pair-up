/**
 * Game configuration constants
 */

import type { ModalConfig } from './modal';

// Game icons for card pairs
export const GAME_ICONS: readonly string[] = [
  'fa-ghost',
  'fa-dragon',
  'fa-hat-wizard',
  'fa-dungeon',
  'fa-skull-crossbones',
  'fa-ring',
  'fa-scroll',
  'fa-shield-halved',
] as const;

// Game rules
export const MAX_TRIES: number = 4;
export const TOTAL_PAIRS: number = GAME_ICONS.length;

// Timing constants (in milliseconds)
export const MATCH_DELAY_MS: number = 500;
export const MISMATCH_DELAY_MS: number = 1000;

// Modal messages
export const MODAL_MESSAGES: {
  readonly WIN: Omit<ModalConfig, 'onClose'>;
  readonly LOSE: Omit<ModalConfig, 'onClose'>;
} = {
  WIN: {
    title: 'You Win!',
    message: 'Congratulations! You matched all pairs!',
    icon: '🎉🏆',
  },
  LOSE: {
    title: 'You Lost!',
    message: 'Try again! You can do it!',
    icon: '😢💪',
  },
} as const;

// UI text
export const UI_TEXT: {
  readonly GAME_TITLE: string;
  readonly MATCHES_LABEL: string;
  readonly TRIES_LABEL: string;
  readonly RESTART_BUTTON: string;
} = {
  GAME_TITLE: 'Cards Pair Up',
  MATCHES_LABEL: 'Matches:',
  TRIES_LABEL: 'Tries Left:',
  RESTART_BUTTON: 'Restart Game',
} as const;
