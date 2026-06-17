import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { GithubService } from '../../core/services/github.service';
import { ExperienceService } from '../../core/services/experience.service';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  private readonly githubService = inject(GithubService);
  private readonly experienceService = inject(ExperienceService);

  projectCount = signal<string>('0');
  programCount = computed(() => this.experienceService.getExperiences().length.toString());

  stats = computed(() => [
    { value: this.projectCount(), label: 'Projects' },
    { value: '2+', label: 'Years Learning' },
    { value: this.programCount(), label: 'Programs' },
  ]);

  ngOnInit(): void {
    this.githubService.getRepos().subscribe((repos) => {
      this.projectCount.set(this.formatProjectCount(repos.length));
    });
  }

  private formatProjectCount(count: number): string {
    if (count < 10) {
      return count.toString();
    }
    const base = Math.floor(count / 10) * 10;
    return `${base}+`;
  }
}
