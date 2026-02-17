import './style.css';
import { Modal } from './modal';
import {
  GAME_ICONS,
  MAX_TRIES,
  TOTAL_PAIRS,
  MATCH_DELAY_MS,
  MISMATCH_DELAY_MS,
  MODAL_MESSAGES,
} from './constants';
import { generateCardDeck } from './utils';

/**
 * Represents a single card in the memory game
 */
export interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

/**
 * Main game class that handles all memory game logic
 * Manages card state, matching logic, and game flow
 */
export class MemoryGame {
  private cards: Card[] = [];
  private flippedCards: Card[] = [];
  private matchedPairs: number = 0;
  private triesLeft: number = MAX_TRIES;
  private isLocked: boolean = false;
  private gridElement: HTMLElement;
  private matchesElement: HTMLElement;
  private triesElement: HTMLElement;
  private totalMatchesElement: HTMLElement;
  private modal: Modal;
  private cardClickHandlers: Map<HTMLElement, () => void> = new Map();

  constructor(
    gridElement: HTMLElement,
    matchesElement: HTMLElement,
    triesElement: HTMLElement,
    totalMatchesElement: HTMLElement
  ) {
    this.gridElement = gridElement;
    this.matchesElement = matchesElement;
    this.triesElement = triesElement;
    this.totalMatchesElement = totalMatchesElement;
    this.modal = new Modal();
  }

  /**
   * Initializes or resets the game to its starting state
   */
  public init(): void {
    this.matchedPairs = 0;
    this.triesLeft = MAX_TRIES;
    this.matchesElement.textContent = '0';
    this.triesElement.textContent = MAX_TRIES.toString();
    this.totalMatchesElement.textContent = TOTAL_PAIRS.toString();
    this.flippedCards = [];
    this.isLocked = false;
    this.generateCards();
    this.render();
  }

  /**
   * Cleanup method to remove event listeners (prevents memory leaks)
   */
  public destroy(): void {
    this.cardClickHandlers.forEach((handler, element) => {
      element.removeEventListener('click', handler);
    });
    this.cardClickHandlers.clear();
  }

  /**
   * Generates and shuffles card pairs for the game
   */
  private generateCards(): void {
    this.cards = generateCardDeck(GAME_ICONS);
  }

  /**
   * Checks if a card can be flipped
   */
  private canFlipCard(card: Card): boolean {
    return !card.isFlipped && !card.isMatched;
  }

  /**
   * Checks if two cards match
   */
  private areCardsMatching(card1: Card, card2: Card): boolean {
    return card1.icon === card2.icon;
  }

  /**
   * Checks if the game is won
   */
  private isGameWon(): boolean {
    return this.matchedPairs === TOTAL_PAIRS;
  }

  /**
   * Checks if the game is lost
   */
  private isGameLost(): boolean {
    return this.triesLeft === 0 && this.matchedPairs < TOTAL_PAIRS;
  }

  /**
   * Handles card click events
   * @param card - The card that was clicked
   */
  private handleCardClick(card: Card): void {
    if (this.isLocked || !this.canFlipCard(card) || this.triesLeft === 0) {
      return;
    }

    card.isFlipped = true;
    this.flippedCards.push(card);
    this.render();

    if (this.flippedCards.length === 2) {
      this.checkMatch();
    }
  }

  /**
   * Checks if two flipped cards match
   * Updates game state accordingly (match/mismatch)
   */
  private checkMatch(): void {
    this.isLocked = true;
    const [card1, card2] = this.flippedCards;

    if (this.areCardsMatching(card1, card2)) {
      card1.isMatched = true;
      card2.isMatched = true;
      this.matchedPairs++;
      this.matchesElement.textContent = this.matchedPairs.toString();
      this.flippedCards = [];
      this.isLocked = false;
      this.render();

      if (this.isGameWon()) {
        setTimeout(() => {
          this.modal.show({
            ...MODAL_MESSAGES.WIN,
            onClose: () => this.init(),
          });
        }, MATCH_DELAY_MS);
      }
    } else {
      this.triesLeft--;
      this.triesElement.textContent = this.triesLeft.toString();

      if (this.isGameLost()) {
        setTimeout(() => {
          this.modal.show({
            ...MODAL_MESSAGES.LOSE,
            onClose: () => this.init(),
          });
        }, MATCH_DELAY_MS);
        this.isLocked = true;
      } else {
        setTimeout(() => {
          card1.isFlipped = false;
          card2.isFlipped = false;
          this.flippedCards = [];
          this.isLocked = false;
          this.render();
        }, MISMATCH_DELAY_MS);
      }
    }
  }

  /**
   * Renders the game grid with all cards
   * Cleans up old event listeners before creating new ones
   */
  private render(): void {
    // Clean up old event listeners
    this.cardClickHandlers.forEach((handler, element) => {
      element.removeEventListener('click', handler);
    });
    this.cardClickHandlers.clear();

    this.gridElement.innerHTML = '';

    this.cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.setAttribute('role', 'button');
      cardElement.setAttribute('tabindex', '0');
      cardElement.setAttribute('aria-label', `Card ${card.id + 1}`);

      if (card.isFlipped || card.isMatched) {
        cardElement.classList.add('flipped');
        cardElement.setAttribute(
          'aria-label',
          `Card ${card.id + 1}: ${card.icon.replace('fa-', '')}`
        );
      }

      if (card.isMatched) {
        cardElement.setAttribute('aria-disabled', 'true');
      }

      cardElement.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
             <i class="fa-solid fa-question" aria-hidden="true"></i>
          </div>
          <div class="card-back">
            <i class="fa-solid ${card.icon}" aria-hidden="true"></i>
          </div>
        </div>
      `;

      const clickHandler = () => this.handleCardClick(card);
      const keyHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleCardClick(card);
        }
      };

      cardElement.addEventListener('click', clickHandler);
      cardElement.addEventListener('keydown', keyHandler as EventListener);

      this.cardClickHandlers.set(cardElement, clickHandler);
      this.gridElement.appendChild(cardElement);
    });
  }
}
