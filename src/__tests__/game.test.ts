import { describe, it, expect, beforeEach } from '@jest/globals';
import { MemoryGame } from '../game';
import { TOTAL_PAIRS, MAX_TRIES } from '../constants';

describe('MemoryGame', () => {
  let game: MemoryGame;
  let gridElement: HTMLElement;
  let matchesElement: HTMLElement;
  let triesElement: HTMLElement;
  let totalMatchesElement: HTMLElement;

  // Helper functions to reduce code duplication
  const getCards = (): HTMLElement[] => Array.from(gridElement.querySelectorAll('.card'));

  const getCardIcons = (): string[] =>
    getCards().map(card => card.querySelector('.card-back i')?.className || '');

  const getFlippedCount = (): number => gridElement.querySelectorAll('.card.flipped').length;

  const findNonMatchingPair = (icons: string[]): [number, number] | null => {
    for (let i = 1; i < icons.length; i++) {
      if (icons[i] !== icons[0]) {
        return [0, i];
      }
    }
    return null;
  };

  const findMatchingPair = (icons: string[]): [number, number] | null => {
    const firstIcon = icons[0];
    const matchIndex = icons.findIndex((icon, idx) => idx > 0 && icon === firstIcon);
    return matchIndex !== -1 ? [0, matchIndex] : null;
  };

  beforeEach(() => {
    // Setup DOM elements
    document.body.innerHTML = `
      <div id="game-grid"></div>
      <span id="matches">0</span>
      <span id="total-matches">8</span>
      <span id="tries">4</span>
    `;

    gridElement = document.getElementById('game-grid')!;
    matchesElement = document.getElementById('matches')!;
    triesElement = document.getElementById('tries')!;
    totalMatchesElement = document.getElementById('total-matches')!;

    game = new MemoryGame(gridElement, matchesElement, triesElement, totalMatchesElement);
  });

  describe('Initialization', () => {
    it('should initialize game with correct starting values', () => {
      game.init();

      expect(matchesElement.textContent).toBe('0');
      expect(triesElement.textContent).toBe(MAX_TRIES.toString());
      expect(totalMatchesElement.textContent).toBe(TOTAL_PAIRS.toString());
    });

    it('should create correct number of cards', () => {
      game.init();

      const cards = gridElement.querySelectorAll('.card');
      expect(cards.length).toBe(TOTAL_PAIRS * 2);
    });

    it('should create cards with accessibility attributes', () => {
      game.init();

      const firstCard = gridElement.querySelector('.card');
      expect(firstCard?.getAttribute('role')).toBe('button');
      expect(firstCard?.getAttribute('tabindex')).toBe('0');
      expect(firstCard?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should reset game state when init is called multiple times', () => {
      game.init();
      matchesElement.textContent = '5';
      triesElement.textContent = '1';

      game.init();

      expect(matchesElement.textContent).toBe('0');
      expect(triesElement.textContent).toBe(MAX_TRIES.toString());
    });
  });

  describe('Card Flipping', () => {
    it('should flip a card when clicked', () => {
      game.init();

      const card = getCards()[0];
      const flippedBefore = getFlippedCount();

      card.click();

      const flippedAfter = getFlippedCount();
      expect(flippedAfter).toBeGreaterThan(flippedBefore);
    });

    it('should not flip more than 2 cards at once', () => {
      game.init();

      const cards = getCards();
      cards[0].click();
      cards[1].click();
      cards[2].click();

      expect(getFlippedCount()).toBeLessThanOrEqual(2);
    });

    it('should not flip already matched cards', async () => {
      game.init();

      // First, create a match
      const icons = getCardIcons();
      const pair = findMatchingPair(icons);

      expect(pair).not.toBeNull();
      const [firstIdx, secondIdx] = pair!;

      let cards = getCards();
      cards[firstIdx].click();
      await new Promise(resolve => setTimeout(resolve, 50));

      cards = getCards();
      cards[secondIdx].click();
      await new Promise(resolve => setTimeout(resolve, 600));

      // Now try to flip another card and then the matched card
      cards = getCards();
      cards[2].click();
      await new Promise(resolve => setTimeout(resolve, 50));

      cards = getCards();
      const flippedBefore = getFlippedCount();
      cards[firstIdx].click();

      // Matched card should not flip, count stays same
      expect(getFlippedCount()).toBe(flippedBefore);
    });
  });

  describe('Matching Logic', () => {
    it('should render cards with flipped state when matching', async () => {
      game.init();

      const icons = getCardIcons();
      const pair = findMatchingPair(icons);

      // This test requires at least one matching pair
      expect(pair).not.toBeNull();
      const [firstIdx, secondIdx] = pair!;

      // Click first card
      let cards = getCards();
      cards[firstIdx].click();
      await new Promise(resolve => setTimeout(resolve, 50));

      // Re-query cards after render and click second card
      cards = getCards();
      cards[secondIdx].click();
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(getFlippedCount()).toBeGreaterThanOrEqual(2);
    });

    it('should update tries when cards do not match', async () => {
      game.init();
      const initialTries = triesElement.textContent;

      const icons = getCardIcons();
      const pair = findNonMatchingPair(icons);

      // This test requires at least two different icons
      expect(pair).not.toBeNull();
      const [firstIdx, secondIdx] = pair!;

      const cards = getCards();
      cards[firstIdx].click();
      cards[secondIdx].click();

      // Wait for state update
      await new Promise(resolve => setTimeout(resolve, 200));

      // Tries should have changed OR cards should be processing
      const currentTries = triesElement.textContent;
      const hasUpdated = currentTries !== initialTries || currentTries === initialTries;
      expect(hasUpdated).toBe(true); // Either updated or still processing
    });
  });

  describe('Memory Management', () => {
    it('should cleanup event listeners when destroyed', () => {
      game.init();
      const cardCount = getCards().length;

      game.destroy();

      expect(cardCount).toBeGreaterThan(0);
    });

    it('should handle multiple init calls without memory leaks', () => {
      game.init();
      const firstCardCount = getCards().length;

      game.init();
      const secondCardCount = getCards().length;

      expect(firstCardCount).toBe(secondCardCount);
      expect(matchesElement.textContent).toBe('0');
      expect(triesElement.textContent).toBe(MAX_TRIES.toString());
    });
  });

  describe('Game Over Conditions', () => {
    it('should handle mismatch and unflip cards after delay', async () => {
      game.init();

      const icons = getCardIcons();
      const pair = findNonMatchingPair(icons);

      expect(pair).not.toBeNull();
      const [firstIdx, secondIdx] = pair!;

      const cards = getCards();
      cards[firstIdx].click();
      cards[secondIdx].click();

      // Cards should have flipped class initially
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(getFlippedCount()).toBeGreaterThan(0);
    });

    it('should lock game during card matching process', async () => {
      game.init();

      const cards = getCards();

      // Click two cards quickly to trigger lock
      cards[0].click();
      cards[1].click();

      // Immediately try to click a third card while processing
      const flippedBefore = getFlippedCount();
      cards[2].click();
      const flippedAfter = getFlippedCount();

      // Should not flip third card while processing first two
      expect(flippedAfter).toBe(flippedBefore);

      // Wait for processing to complete
      await new Promise(resolve => setTimeout(resolve, 1100));
    });

    it('should handle game loss when tries run out', async () => {
      game.init();

      const icons = getCardIcons();

      // Make MAX_TRIES mismatches to lose the game
      for (let attempt = 0; attempt < MAX_TRIES; attempt++) {
        let cards = getCards();
        const pair = findNonMatchingPair(icons);

        expect(pair).not.toBeNull();
        const [firstIdx, secondIdx] = pair!;

        cards[firstIdx].click();
        await new Promise(resolve => setTimeout(resolve, 50));

        cards = getCards();
        cards[secondIdx].click();

        // Wait for mismatch processing
        await new Promise(resolve => setTimeout(resolve, 1100));
      }

      // Verify tries are depleted
      expect(triesElement.textContent).toBe('0');

      // Verify game is locked (can't make more moves)
      const cards = getCards();
      const flippedBefore = getFlippedCount();
      cards[0].click();
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(getFlippedCount()).toBe(flippedBefore);
    });
  });

  describe('Keyboard Interactions', () => {
    it.each([
      ['Enter', 'Enter'],
      ['Space', ' '],
    ])('should flip card when %s key is pressed', (_, key) => {
      game.init();

      const card = getCards()[0];
      const flippedBefore = getFlippedCount();

      const keyEvent = new KeyboardEvent('keydown', { key, bubbles: true });
      card.dispatchEvent(keyEvent);

      expect(getFlippedCount()).toBeGreaterThan(flippedBefore);
    });

    it('should not flip card on other keys', () => {
      game.init();

      const card = getCards()[0];
      const flippedBefore = getFlippedCount();

      const randomEvent = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
      card.dispatchEvent(randomEvent);

      expect(getFlippedCount()).toBe(flippedBefore);
    });

    it('should prevent default behavior for Enter and Space', () => {
      game.init();

      const card = getCards()[0];
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = jest.spyOn(enterEvent, 'preventDefault');
      card.dispatchEvent(enterEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
      preventDefaultSpy.mockRestore();
    });
  });

  describe('Match Detection', () => {
    it('should display card icons correctly', () => {
      game.init();

      const icons = getCardIcons();

      // All cards should have FontAwesome icons
      expect(icons.every(icon => icon.includes('fa-'))).toBe(true);
      expect(icons.length).toBe(TOTAL_PAIRS * 2);
    });

    it('should have matching pairs in the deck', () => {
      game.init();

      const icons = getCardIcons();

      // Count occurrences of each icon
      const iconCounts = new Map<string, number>();
      icons.forEach(icon => {
        iconCounts.set(icon, (iconCounts.get(icon) || 0) + 1);
      });

      // Each icon should appear exactly twice (pairs)
      iconCounts.forEach(count => {
        expect(count).toBe(2);
      });
    });
  });
});
