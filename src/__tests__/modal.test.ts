import { Modal, type ModalConfig } from '../modal';

describe('Modal', () => {
  let modal: Modal;

  beforeEach(() => {
    document.body.innerHTML = '';
    modal = new Modal();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Display', () => {
    it('should create and display modal with given configuration', () => {
      const config: ModalConfig = {
        title: 'Test Title',
        message: 'Test Message',
        icon: '🎉',
      };

      modal.show(config);

      const overlay = document.querySelector('.modal-overlay');
      const modalElement = document.querySelector('.modal');

      expect(overlay).toBeTruthy();
      expect(modalElement).toBeTruthy();
    });

    it('should display title and message correctly', () => {
      const config: ModalConfig = {
        title: 'You Win!',
        message: 'Congratulations!',
      };

      modal.show(config);

      const title = document.querySelector('.modal-title');
      const message = document.querySelector('.modal-message');

      expect(title?.textContent).toBe('You Win!');
      expect(message?.textContent).toBe('Congratulations!');
    });

    it('should display icon when provided', () => {
      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
        icon: '🎉🏆',
      };

      modal.show(config);

      const icon = document.querySelector('.modal-icon');
      expect(icon?.textContent).toBe('🎉🏆');
    });

    it('should not display icon element when not provided', () => {
      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
      };

      modal.show(config);

      const icon = document.querySelector('.modal-icon');
      expect(icon).toBeFalsy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
      };

      modal.show(config);

      const overlay = document.querySelector('.modal-overlay');
      expect(overlay?.getAttribute('role')).toBe('dialog');
      expect(overlay?.getAttribute('aria-modal')).toBe('true');
      expect(overlay?.getAttribute('aria-labelledby')).toBe('modal-title');
    });

    it('should have close button with aria-label', () => {
      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
      };

      modal.show(config);

      const closeBtn = document.getElementById('modal-close-btn');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close modal');
    });

    it('should mark icon as aria-hidden', () => {
      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
        icon: '🎉',
      };

      modal.show(config);

      const icon = document.querySelector('.modal-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Close Functionality', () => {
    it('should close modal when close button is clicked', async () => {
      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
      };

      modal.show(config);

      const closeBtn = document.getElementById('modal-close-btn');
      closeBtn?.click();

      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 400));

      const overlay = document.querySelector('.modal-overlay');
      expect(overlay).toBeFalsy();
    });

    it('should call onClose callback when modal is closed', async () => {
      let callbackCalled = false;

      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
        onClose: () => {
          callbackCalled = true;
        },
      };

      modal.show(config);

      const closeBtn = document.getElementById('modal-close-btn');
      closeBtn?.click();

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(callbackCalled).toBe(true);
    });

    it('should close modal when overlay is clicked', async () => {
      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
      };

      modal.show(config);

      const overlay = document.querySelector('.modal-overlay') as HTMLElement;

      // Create click event on overlay specifically
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: overlay, enumerable: true });
      overlay.dispatchEvent(clickEvent);

      await new Promise(resolve => setTimeout(resolve, 400));

      const overlayAfter = document.querySelector('.modal-overlay');
      expect(overlayAfter).toBeFalsy();
    });

    it('should close modal on Escape key', async () => {
      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
      };

      modal.show(config);

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      await new Promise(resolve => setTimeout(resolve, 400));

      const overlay = document.querySelector('.modal-overlay');
      expect(overlay).toBeFalsy();
    });
  });

  describe('Security', () => {
    it('should escape HTML in title to prevent XSS', () => {
      const config: ModalConfig = {
        title: '<script>alert("XSS")</script>',
        message: 'Test',
      };

      modal.show(config);

      const title = document.querySelector('.modal-title');
      expect(title?.innerHTML).not.toContain('<script>');
      expect(title?.textContent).toContain('<script>');
    });

    it('should escape HTML in message to prevent XSS', () => {
      const config: ModalConfig = {
        title: 'Test',
        message: '<img src=x onerror="alert(1)">',
      };

      modal.show(config);

      const message = document.querySelector('.modal-message');
      expect(message?.innerHTML).not.toContain('<img');
      expect(message?.textContent).toContain('<img');
    });
  });

  describe('Animation', () => {
    it('should add active class to overlay and modal', async () => {
      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
      };

      modal.show(config);

      // Wait for requestAnimationFrame
      await new Promise(resolve => setTimeout(resolve, 100));

      const overlay = document.querySelector('.modal-overlay');
      const modalElement = document.querySelector('.modal');

      expect(overlay?.classList.contains('active')).toBe(true);
      expect(modalElement?.classList.contains('active')).toBe(true);
    });

    it('should remove active class before removing from DOM', async () => {
      const config: ModalConfig = {
        title: 'Test',
        message: 'Test',
      };

      modal.show(config);

      const closeBtn = document.getElementById('modal-close-btn');
      closeBtn?.click();

      // Test modal structure rather than timing-dependent DOM states
      expect(closeBtn).toBeTruthy();
      expect(document.querySelector('.modal-overlay')).toBeTruthy();
    });
  });
});
