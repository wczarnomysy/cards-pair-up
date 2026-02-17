import './style.css';

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
 * Configuration for modal display
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

    // Add event listeners
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.hide();
        if (config.onClose) {
          config.onClose();
        }
      });
    }

    // Close on overlay click
    this.overlayElement.addEventListener('click', e => {
      if (e.target === this.overlayElement) {
        this.hide();
        if (config.onClose) {
          config.onClose();
        }
      }
    });

    // Close on Escape key
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.hide();
        if (config.onClose) {
          config.onClose();
        }
      }
    };
    document.addEventListener('keydown', escapeHandler);
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
   * Hides and removes the modal from DOM
   */
  private hide(): void {
    if (this.overlayElement && this.modalElement) {
      this.modalElement.classList.remove('active');
      this.overlayElement.classList.remove('active');

      setTimeout(() => {
        if (this.overlayElement && this.overlayElement.parentNode) {
          this.overlayElement.parentNode.removeChild(this.overlayElement);
        }
        this.modalElement = null;
        this.overlayElement = null;
      }, 300);
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
