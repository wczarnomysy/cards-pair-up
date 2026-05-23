export const GAME_ICONS: readonly string[] = [
  'fa-ghost',
  'fa-dragon',
  'fa-hat-wizard',
  'fa-dungeon',
  'fa-skull-crossbones',
  'fa-ring',
  'fa-scroll',
  'fa-shield-halved',
];

export const MAX_TRIES = 6;
export const TOTAL_PAIRS = GAME_ICONS.length;
export const CARDS_PER_TURN = 2;

export const MATCH_DELAY_MS = 500;
export const MISMATCH_DELAY_MS = 1000;
export const MODAL_ANIMATION_MS = 300;

export const MODAL_MESSAGES = {
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

export const UI_TEXT = {
  GAME_TITLE: 'Cards Pair Up',
  MATCHES_LABEL: 'Matches:',
  TRIES_LABEL: 'Tries Left:',
  RESTART_BUTTON: 'Restart Game',
} as const;
