import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { GithubService } from '../../core/services/github.service';
import { Project } from '../../core/models/project.model';

interface FilterTab {
  key: string;
  label: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  private readonly githubService = inject(GithubService);

  private readonly frontendTopics = [
    'html', 'css', 'javascript', 'angular', 'bootstrap', 'scss', 'typescript',
    'frontend', 'web', 'react', 'vue',
  ];
  private readonly mlTopics = [
    'python', 'machine-learning', 'data-science', 'pandas', 'numpy',
    'ml', 'ai', 'deep-learning', 'scikit-learn', 'xgboost', 'lightgbm',
  ];

  isFrontendProject(p: Project): boolean {
    if (p.topics?.some((t) => this.frontendTopics.includes(t.toLowerCase()))) {
      return true;
    }
    const lang = p.language?.toLowerCase();
    if (lang && ['html', 'css', 'javascript', 'typescript', 'scss'].includes(lang)) {
      return true;
    }
    const name = p.name.toLowerCase();
    const desc = p.description?.toLowerCase() || '';
    const frontendKeywords = ['portfolio', 'e-commerc', 'burger', 'web', 'bootstrap', 'ui', 'design', 'frontend', 'app', 'assigment'];
    return frontendKeywords.some((kw) => name.includes(kw) || desc.includes(kw));
  }

  isMlProject(p: Project): boolean {
    if (p.topics?.some((t) => this.mlTopics.includes(t.toLowerCase()))) {
      return true;
    }
    const lang = p.language?.toLowerCase();
    if (lang && ['python', 'r', 'julia'].includes(lang)) {
      return true;
    }
    const name = p.name.toLowerCase();
    const desc = p.description?.toLowerCase() || '';
    const mlKeywords = ['algorithm', 'data-science', 'machine-learning', 'ai', 'model', 'dataset', 'classification', 'regression', 'prediction', 'neural-network', 'deep-learning'];
    return mlKeywords.some((kw) => name.includes(kw) || desc.includes(kw));
  }

  projects = signal<Project[]>([]);
  isLoading = signal(true);
  hasError = signal(false);
  searchQuery = signal('');
  activeFilter = signal('all');

  filterTabs = computed<FilterTab[]>(() => {
    const tabs: FilterTab[] = [{ key: 'all', label: 'All' }];
    
    const hasFrontend = this.projects().some((p) => this.isFrontendProject(p));
    if (hasFrontend) {
      tabs.push({ key: 'frontend', label: 'Frontend' });
    }

    const hasMl = this.projects().some((p) => this.isMlProject(p));
    if (hasMl) {
      tabs.push({ key: 'ml', label: 'ML & Data Science' });
    }
    return tabs;
  });

  filteredProjects = computed(() => {
    let result = this.projects();
    const query = this.searchQuery().toLowerCase().trim();
    const filter = this.activeFilter();

    // Category filter
    if (filter === 'frontend') {
      result = result.filter((p) => this.isFrontendProject(p));
    } else if (filter === 'ml') {
      result = result.filter((p) => this.isMlProject(p));
    }

    // Search filter
    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query))
      );
    }

    return result;
  });

  ngOnInit(): void {
    this.githubService.getRepos().subscribe({
      next: (repos) => {
        this.projects.set(repos);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  setFilter(key: string): void {
    this.activeFilter.set(key);
  }

  getCleanDescription(description: string | null): string {
    if (!description) return '';
    return description.replace(/included in portfolio./gi, '').replace(/\s{2,}/g, ' ').trim();
  }

  getCleanName(name: string): string {
    if (!name) return '';
    return name.replace(/semicode-/gi, '').trim();
  }

  selectedProject = signal<Project | null>(null);

  openModal(project: Project): void {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }
}
