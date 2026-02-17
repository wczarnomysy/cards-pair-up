import { describe, it, expect } from '@jest/globals';
import { generateCardDeck } from '../utils';

describe('Utility Functions', () => {
  describe('generateCardDeck', () => {
    it('should create pairs of each icon', () => {
      const icons = ['fa-ghost', 'fa-dragon', 'fa-wizard'];
      const deck = generateCardDeck(icons);

      expect(deck.length).toBe(icons.length * 2);

      icons.forEach(icon => {
        const count = deck.filter(card => card.icon === icon).length;
        expect(count).toBe(2);
      });
    });

    it('should create cards with unique ids', () => {
      const icons = ['fa-ghost', 'fa-dragon'];
      const deck = generateCardDeck(icons);
      const ids = deck.map(card => card.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should initialize all cards as not flipped and not matched', () => {
      const icons = ['fa-ghost', 'fa-dragon'];
      const deck = generateCardDeck(icons);

      deck.forEach(card => {
        expect(card.isFlipped).toBe(false);
        expect(card.isMatched).toBe(false);
      });
    });

    it('should handle empty icon array', () => {
      const deck = generateCardDeck([]);
      expect(deck).toEqual([]);
    });

    it('should handle single icon', () => {
      const deck = generateCardDeck(['fa-heart']);

      expect(deck.length).toBe(2);
      expect(deck[0].icon).toBe('fa-heart');
      expect(deck[1].icon).toBe('fa-heart');
      expect(deck[0].id).not.toBe(deck[1].id);
    });
  });
});
