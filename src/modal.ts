import { MODAL_ANIMATION_MS } from './constants';

/**
 * Configuration for modal dialogs
 */
export interface ModalConfig {
  title: string;
  message: string;
  icon?: string;
  onClose?: () => void;
}

/**
 * Reusable modal component for displaying game notifications
 * Handles creation, display, and cleanup of modal dialogs
 */
export class Modal {
  private modalElement: HTMLElement | null = null;
  private overlayElement: HTMLElement | null = null;
  private escapeHandler: ((_e: KeyboardEvent) => void) | null = null;

  /**
   * Displays a modal with the given configuration
   * @param config - Modal configuration including title, message, icon, and close callback
   */
  public show(config: ModalConfig): void {
    this.createModal(config);
    this.displayModal();
  }

  /**
   * Creates modal DOM elements and sets up event listeners
   * @param config - Modal configuration
   */
  private createModal(config: ModalConfig): void {
    // Create overlay
    this.overlayElement = document.createElement('div');
    this.overlayElement.classList.add('modal-overlay');
    this.overlayElement.setAttribute('role', 'dialog');
    this.overlayElement.setAttribute('aria-modal', 'true');
    this.overlayElement.setAttribute('aria-labelledby', 'modal-title');

    // Create modal container
    this.modalElement = document.createElement('div');
    this.modalElement.classList.add('modal');

    // Create modal content
    const modalContent = `
      <div class="modal-content">
        ${config.icon ? `<div class="modal-icon" aria-hidden="true">${config.icon}</div>` : ''}
        <h2 class="modal-title" id="modal-title">${this.escapeHtml(config.title)}</h2>
        <p class="modal-message">${this.escapeHtml(config.message)}</p>
        <button class="modal-button" id="modal-close-btn" aria-label="Close modal">Close</button>
      </div>
    `;

    this.modalElement.innerHTML = modalContent;
    this.overlayElement.appendChild(this.modalElement);
    document.body.appendChild(this.overlayElement);

    const closeBtn = this.modalElement.querySelector<HTMLElement>('#modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeAndCallback(config.onClose));
    }

    this.overlayElement.addEventListener('click', e => {
      if (e.target === this.overlayElement) {
        this.closeAndCallback(config.onClose);
      }
    });

    this.escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.closeAndCallback(config.onClose);
      }
    };
    document.addEventListener('keydown', this.escapeHandler);
  }

  /**
   * Displays the modal with animation
   */
  private displayModal(): void {
    requestAnimationFrame(() => {
      if (this.overlayElement && this.modalElement) {
        this.overlayElement.classList.add('active');
        this.modalElement.classList.add('active');
      }
    });
  }

  /**
   * Hides the modal and invokes the optional close callback
   */
  private closeAndCallback(onClose?: () => void): void {
    this.hide();
    if (onClose) {
      onClose();
    }
  }

  /**
   * Hides and removes the modal from DOM
   */
  private hide(): void {
    if (this.overlayElement && this.modalElement) {
      this.modalElement.classList.remove('active');
      this.overlayElement.classList.remove('active');

      // Remove escape key listener
      if (this.escapeHandler) {
        document.removeEventListener('keydown', this.escapeHandler);
        this.escapeHandler = null;
      }

      // Null references immediately to prevent re-entrance during the fade-out animation
      const overlayToRemove = this.overlayElement;
      this.overlayElement = null;
      this.modalElement = null;

      setTimeout(() => {
        if (overlayToRemove.parentNode) {
          overlayToRemove.parentNode.removeChild(overlayToRemove);
        }
      }, MODAL_ANIMATION_MS);
    }
  }

  /**
   * Escapes HTML to prevent XSS attacks
   * @param text - Text to escape
   * @returns Escaped text safe for HTML insertion
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
