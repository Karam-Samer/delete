import { Component, signal, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly roles = [
    'Frontend Developer',
    'ML Enthusiast',
    'CS & AI Student',
  ];

  displayText = signal('');
  isBlinking = signal(true);

  private currentRoleIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.type();
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private type(): void {
    const currentRole = this.roles[this.currentRoleIndex];
    this.isBlinking.set(false);

    if (!this.isDeleting) {
      // Typing
      this.displayText.set(currentRole.substring(0, this.currentCharIndex + 1));
      this.currentCharIndex++;

      if (this.currentCharIndex === currentRole.length) {
        // Finished typing, pause then delete
        this.isBlinking.set(true);
        this.timeoutId = setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, 2000);
        return;
      }

      this.timeoutId = setTimeout(() => this.type(), 80);
    } else {
      // Deleting
      this.displayText.set(currentRole.substring(0, this.currentCharIndex - 1));
      this.currentCharIndex--;

      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.timeoutId = setTimeout(() => this.type(), 500);
        return;
      }

      this.timeoutId = setTimeout(() => this.type(), 40);
    }
  }
}
