// Gmail Delay Logic for Email Magic: SendShield
// This module handles intercepting the Send button, delaying send, showing the countdown, and Outbox logic.

const DEFAULT_DELAY = 60; // seconds

export interface DelaySettings {
  delaySeconds: number;
}

export class GmailDelay {
  private settings: DelaySettings;
  private observer: MutationObserver | null = null;

  constructor(settings: DelaySettings) {
    this.settings = settings;
  }

  public start() {
    this.observeComposeWindows();
  }

  private observeComposeWindows() {
    this.observer = new MutationObserver(() => {
      this.attachToComposeWindows();
    });
    this.observer.observe(document.body, { childList: true, subtree: true });
    this.attachToComposeWindows();
  }

  private attachToComposeWindows() {
    const composeWindows = document.querySelectorAll('[role="dialog"] form');
    composeWindows.forEach(form => {
      const sendBtn = (form as HTMLElement).querySelector('[data-tooltip^="Send"]');
      if (sendBtn && !sendBtn.hasAttribute('data-sendshield')) {
        sendBtn.setAttribute('data-sendshield', 'true');
        sendBtn.addEventListener('click', e => this.handleSendClick(e, form as HTMLElement), true);
      }
    });
  }

  private handleSendClick(e: Event, form: HTMLElement) {
    e.stopImmediatePropagation();
    e.preventDefault();
    // Hide Gmail's native send
    // Show our delay UI
    this.showDelayUI(form);
    // Start countdown, then trigger send
    this.startDelay(form);
  }

  private showDelayUI(form: HTMLElement) {
    // Remove existing if present
    const existing = form.querySelector('.sendshield-delay-ui');
    if (existing) existing.remove();
    // Create icon
    const ui = document.createElement('div');
    ui.className = 'sendshield-delay-ui';
    ui.style.position = 'absolute';
    ui.style.bottom = '16px';
    ui.style.right = '16px';
    ui.style.zIndex = '9999';
    ui.style.background = 'rgba(255,255,255,0.95)';
    ui.style.borderRadius = '24px';
    ui.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    ui.style.display = 'flex';
    ui.style.alignItems = 'center';
    ui.style.padding = '6px 16px';
    ui.style.fontFamily = 'Inter, Helvetica Neue, Arial, sans-serif';
    ui.style.fontWeight = '500';
    ui.style.gap = '8px';
    // SVG clock icon
    ui.innerHTML = `
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#6366f1" stroke-width="2" fill="#fff"/>
        <path d="M12 7v5l3 2" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span class="sendshield-timer">${this.settings.delaySeconds}s</span>
      <button class="sendshield-cancel" style="margin-left:12px;background:none;border:none;color:#ef4444;font-weight:600;cursor:pointer;">Cancel</button>
    `;
    form.appendChild(ui);
    // Cancel button
    ui.querySelector('.sendshield-cancel')?.addEventListener('click', () => {
      this.cancelSend(form);
    });
  }

  private startDelay(form: HTMLElement) {
    let seconds = this.settings.delaySeconds;
    const timerSpan = form.querySelector('.sendshield-timer') as HTMLElement;
    const interval = setInterval(() => {
      seconds--;
      if (timerSpan) timerSpan.textContent = `${seconds}s`;
      if (seconds <= 0) {
        clearInterval(interval);
        this.sendEmail(form);
      }
    }, 1000);
    // Store interval for cancel
    (form as any)._sendshieldInterval = interval;
  }

  private cancelSend(form: HTMLElement) {
    // Remove UI and clear interval
    const ui = form.querySelector('.sendshield-delay-ui');
    if (ui) ui.remove();
    const interval = (form as any)._sendshieldInterval;
    if (interval) clearInterval(interval);
    // Optionally, restore draft or allow edit
  }

  private sendEmail(form: HTMLElement) {
    // Remove UI
    const ui = form.querySelector('.sendshield-delay-ui');
    if (ui) ui.remove();
    // Find the Send button and trigger click
    const sendBtn = form.querySelector('[data-tooltip^="Send"]');
    if (sendBtn) {
      (sendBtn as HTMLElement).click();
    }
  }
}

// Helper to load settings from Chrome storage
export async function getDelaySettings(): Promise<DelaySettings> {
  return new Promise(resolve => {
    chrome.storage.sync.get(['delaySeconds'], result => {
      resolve({ delaySeconds: result.delaySeconds || DEFAULT_DELAY });
    });
  });
} 