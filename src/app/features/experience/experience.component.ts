import { Component, signal, inject, HostListener } from '@angular/core';
import { ExperienceService, Experience } from '../../core/services/experience.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  private readonly experienceService = inject(ExperienceService);
  readonly experiences: Experience[] = this.experienceService.getExperiences();

  lightboxOpen = signal(false);
  lightboxImage = signal('');
  lightboxTitle = signal('');

  expandedIndex = signal<number | null>(null);
  isMobile = signal(false);

  constructor() {
    this.checkViewport();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkViewport();
  }

  toggleAccordion(index: number): void {
    if (!this.isMobile()) return;
    this.expandedIndex.update(current => current === index ? null : index);
  }

  isExpanded(index: number): boolean {
    return !this.isMobile() || this.expandedIndex() === index;
  }

  private checkViewport(): void {
    if (typeof window !== 'undefined') {
      this.isMobile.set(window.innerWidth <= 768);
    }
  }

  openLightbox(certificate: string, title: string): void {
    this.lightboxImage.set(certificate);
    this.lightboxTitle.set(title);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('lightbox-overlay')) {
      this.closeLightbox();
    }
  }
}
