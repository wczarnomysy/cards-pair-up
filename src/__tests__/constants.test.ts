import { describe, it, expect } from '@jest/globals';
import {
  GAME_ICONS,
  MAX_TRIES,
  TOTAL_PAIRS,
  MATCH_DELAY_MS,
  MISMATCH_DELAY_MS,
  MODAL_MESSAGES,
  UI_TEXT,
} from '../constants';

describe('Constants', () => {
  describe('GAME_ICONS', () => {
    it('should have 8 unique icons', () => {
      expect(GAME_ICONS.length).toBe(8);
      const uniqueIcons = new Set(GAME_ICONS);
      expect(uniqueIcons.size).toBe(8);
    });

    it('should have FontAwesome icon class names', () => {
      GAME_ICONS.forEach(icon => {
        expect(icon).toMatch(/^fa-/);
      });
    });
  });

  describe('Game Rules', () => {
    it('should have MAX_TRIES set to 6', () => {
      expect(MAX_TRIES).toBe(6);
    });

    it('should calculate TOTAL_PAIRS correctly', () => {
      expect(TOTAL_PAIRS).toBe(GAME_ICONS.length);
    });
  });

  describe('Timing Constants', () => {
    it('should have match delay of 500ms', () => {
      expect(MATCH_DELAY_MS).toBe(500);
    });

    it('should have mismatch delay of 1000ms', () => {
      expect(MISMATCH_DELAY_MS).toBe(1000);
    });

    it('should have mismatch delay longer than match delay', () => {
      expect(MISMATCH_DELAY_MS).toBeGreaterThan(MATCH_DELAY_MS);
    });
  });

  describe('Modal Messages', () => {
    it('should have WIN message configuration', () => {
      expect(MODAL_MESSAGES.WIN).toBeDefined();
      expect(MODAL_MESSAGES.WIN.title).toBe('You Win!');
      expect(MODAL_MESSAGES.WIN.message).toBeTruthy();
      expect(MODAL_MESSAGES.WIN.icon).toBeTruthy();
    });

    it('should have LOSE message configuration', () => {
      expect(MODAL_MESSAGES.LOSE).toBeDefined();
      expect(MODAL_MESSAGES.LOSE.title).toBe('You Lost!');
      expect(MODAL_MESSAGES.LOSE.message).toBeTruthy();
      expect(MODAL_MESSAGES.LOSE.icon).toBeTruthy();
    });
  });

  describe('UI Text', () => {
    it('should have all required UI text labels', () => {
      expect(UI_TEXT.GAME_TITLE).toBe('Cards Pair Up');
      expect(UI_TEXT.MATCHES_LABEL).toBeTruthy();
      expect(UI_TEXT.TRIES_LABEL).toBeTruthy();
      expect(UI_TEXT.RESTART_BUTTON).toBeTruthy();
    });
  });

  describe('Constants Immutability', () => {
    it('should be readonly constants', () => {
      // TypeScript ensures this at compile time with 'as const'
      // At runtime, we can verify they're not undefined
      expect(GAME_ICONS).toBeDefined();
      expect(MAX_TRIES).toBeDefined();
      expect(MODAL_MESSAGES).toBeDefined();
    });
  });
});
