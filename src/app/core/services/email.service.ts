import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email.config';

export type EmailStatus = 'idle' | 'sending' | 'success' | 'error';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {

  private readonly COOLDOWN_MS = 30_000;
  private readonly MAX_PER_SESSION = 5;
  private lastSendTime = 0;
  private sessionSendCount = 0;

  constructor() {
    emailjs.init(EMAIL_CONFIG.publicKey);
  }

  async send(data: ContactFormData): Promise<void> {
    this.enforceRateLimits();

    const sanitized = this.sanitize(data);

    const templateParams = {
      name: sanitized.name,
      email: sanitized.email,
      from_name: sanitized.name,
      from_email: sanitized.email,
      message: sanitized.message,
      title: 'Portfolio Contact',
    };

    await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams,
    );

    this.lastSendTime = Date.now();
    this.sessionSendCount++;
  }

  getCooldownRemaining(): number {
    const elapsed = Date.now() - this.lastSendTime;
    const remaining = this.COOLDOWN_MS - elapsed;
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
  }

  private enforceRateLimits(): void {
    if (this.sessionSendCount >= this.MAX_PER_SESSION) {
      throw new Error(
        'You have reached the maximum number of messages for this session. Please try again later.'
      );
    }

    const cooldown = this.getCooldownRemaining();
    if (cooldown > 0) {
      throw new Error(
        `Please wait ${cooldown} seconds before sending another message.`
      );
    }
  }

  private sanitize(data: ContactFormData): ContactFormData {
    return {
      name: this.stripHtml(data.name).slice(0, 100),
      email: this.stripHtml(data.email).slice(0, 254),
      message: this.stripHtml(data.message).slice(0, 2000),
    };
  }

  private stripHtml(value: string): string {
    return (value || '').replace(/<[^>]*>/g, '').trim();
  }
}
