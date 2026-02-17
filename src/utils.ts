/**
 * Utility functions for Cards Pair Up game
 * Core algorithms and pure functions
 */

import type { Card } from './game';

/**
 * Creates a new card instance
 * @param icon - FontAwesome icon class name
 * @param id - Unique card identifier
 * @returns A new Card object
 */
function createCard(icon: string, id: number): Card {
  return {
    id,
    icon,
    isFlipped: false,
    isMatched: false,
  };
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array - Array to shuffle
 * @returns New shuffled array
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Generates a shuffled deck of card pairs
 * @param icons - Array of icon names to create pairs from
 * @returns Array of shuffled cards
 */
export function generateCardDeck(icons: readonly string[]): Card[] {
  const pairs = [...icons, ...icons];
  return shuffleArray(pairs.map((icon, index) => createCard(icon, index)));
}
