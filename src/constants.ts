import type { ModalConfig } from './modal';

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

export const MAX_TRIES: number = 6;
export const TOTAL_PAIRS: number = GAME_ICONS.length;
export const CARDS_PER_TURN: number = 2;

export const MATCH_DELAY_MS: number = 500;
export const MISMATCH_DELAY_MS: number = 1000;
export const MODAL_ANIMATION_MS: number = 300;

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
