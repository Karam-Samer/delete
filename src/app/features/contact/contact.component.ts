import { Component, signal, computed, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailService, EmailStatus } from '../../core/services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnDestroy {
  form: FormGroup;
  status = signal<EmailStatus>('idle');
  errorMessage = signal('');

  isSending = computed(() => this.status() === 'sending');
  isSuccess = computed(() => this.status() === 'success');
  isError = computed(() => this.status() === 'error');

  private dismissTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    });
  }

  ngOnDestroy(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getFieldError(field: string): string {
    const control = this.form.get(field);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) {
      const labels: Record<string, string> = {
        name: 'Name',
        email: 'Email',
        message: 'Message',
      };
      return `${labels[field] || field} is required`;
    }
    if (control.errors['email']) return 'Enter a valid email address';
    if (control.errors['minlength']) {
      const min = control.errors['minlength'].requiredLength;
      return `Minimum ${min} characters required`;
    }
    if (control.errors['maxlength']) {
      const max = control.errors['maxlength'].requiredLength;
      return `Maximum ${max} characters allowed`;
    }
    return 'Invalid input';
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isSending()) return;

    this.status.set('sending');
    this.errorMessage.set('');

    try {
      await this.emailService.send(this.form.value);
      this.status.set('success');
      this.form.reset();
      this.autoDismiss();
    } catch (error: unknown) {
      this.status.set('error');
      this.errorMessage.set(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again or email me directly.'
      );
      this.autoDismiss(8000);
    }
  }

  dismissAlert(): void {
    this.status.set('idle');
    this.errorMessage.set('');
  }

  private autoDismiss(ms = 5000): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }
    this.dismissTimer = setTimeout(() => {
      this.status.set('idle');
      this.errorMessage.set('');
    }, ms);
  }
}
