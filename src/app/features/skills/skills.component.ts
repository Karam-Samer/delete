import { Component, signal, computed, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Skill, SkillCategory } from '../../core/models/skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('fadeSwitch', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('frontendBtn') frontendBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('mlBtn') mlBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('fundamentalsBtn') fundamentalsBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('toolsBtn') toolsBtn!: ElementRef<HTMLButtonElement>;

  activeCategory = signal<SkillCategory>('frontend');
  indicatorWidth = signal<number>(0);
  indicatorLeft = signal<number>(0);

  readonly frontendSkills: Skill[] = [
    { name: 'Angular', category: 'frontend', icon: 'fa-brands fa-angular', color: '#DD0031' },
    { name: 'TypeScript', category: 'frontend', icon: 'devicon-typescript-plain', color: '#3178C6' },
    { name: 'JavaScript', category: 'frontend', icon: 'fa-brands fa-js', color: '#F7DF1E' },
    { name: 'HTML5', category: 'frontend', icon: 'fa-brands fa-html5', color: '#E34F26' },
    { name: 'CSS3', category: 'frontend', icon: 'fa-brands fa-css3-alt', color: '#1572B6' },
    { name: 'SASS', category: 'frontend', icon: 'fa-brands fa-sass', color: '#CC6699' },
    { name: 'Bootstrap', category: 'frontend', icon: 'fa-brands fa-bootstrap', color: '#7952B3' },
    { name: 'Responsive Web Design', category: 'frontend', icon: 'fa-solid fa-mobile-screen-button', color: '#00BD9D' },
    { name: 'jQuery', category: 'frontend', icon: 'devicon-jquery-plain', color: '#0769AD' },
  ];

  readonly mlSkills: Skill[] = [
    { name: 'Python', category: 'ml', icon: 'fa-brands fa-python', color: '#3776AB' },
    { name: 'SQL', category: 'ml', icon: 'fa-solid fa-database', color: '#F39C12' },
    { name: 'Pandas', category: 'ml', icon: 'fa-solid fa-table', color: '#8C43FF' },
    { name: 'NumPy', category: 'ml', icon: 'fa-solid fa-cubes', color: '#4DABF7' },
    { name: 'scikit-learn', category: 'ml', icon: 'fa-solid fa-robot', color: '#F7931E' },
    { name: 'XGBoost', category: 'ml', icon: 'fa-solid fa-gauge-high', color: '#FF5A00' },
    { name: 'LightGBM', category: 'ml', icon: 'fa-solid fa-bolt', color: '#00A3E0' },
    { name: 'Matplotlib', category: 'ml', icon: 'fa-solid fa-chart-bar', color: '#00FFCC' },
    { name: 'Data Analysis', category: 'ml', icon: 'fa-solid fa-magnifying-glass-chart', color: '#3498DB' },
    { name: 'Data Science', category: 'ml', icon: 'fa-solid fa-chart-line', color: '#1ABC9C' },
    { name: 'Machine Learning', category: 'ml', icon: 'fa-solid fa-brain', color: '#9B59B6' },
    { name: 'Feature Engineering', category: 'ml', icon: 'fa-solid fa-gears', color: '#E67E22' },
    { name: 'Model Evaluation', category: 'ml', icon: 'fa-solid fa-square-poll-vertical', color: '#F1C40F' },
    { name: 'Data Visualization', category: 'ml', icon: 'fa-solid fa-chart-area', color: '#E74C3C' },
    { name: 'Supervised Learning', category: 'ml', icon: 'fa-solid fa-circle-nodes', color: '#2ECC71' },
    { name: 'Unsupervised Learning', category: 'ml', icon: 'fa-solid fa-network-wired', color: '#16A085' },
    { name: 'Statistics', category: 'ml', icon: 'fa-solid fa-calculator', color: '#8E44AD' },
    { name: 'Mathematics', category: 'ml', icon: 'fa-solid fa-square-root-variable', color: '#5DADE2' },
  ];

  readonly fundamentalsSkills: Skill[] = [
    { name: 'Problem Solving', category: 'fundamentals', icon: 'fa-solid fa-lightbulb', color: '#F1C40F' },
    { name: 'Data Structures', category: 'fundamentals', icon: 'fa-solid fa-sitemap', color: '#9B59B6' },
    { name: 'Algorithms', category: 'fundamentals', icon: 'fa-solid fa-diagram-project', color: '#2ECC71' },
    { name: 'OOP', category: 'fundamentals', icon: 'fa-solid fa-cubes', color: '#E67E22' },
    { name: 'Databases', category: 'fundamentals', icon: 'fa-solid fa-database', color: '#F39C12' },
    { name: 'Java', category: 'fundamentals', icon: 'fa-brands fa-java', color: '#ED8B00' },
    { name: 'C++', category: 'fundamentals', icon: 'fa-solid fa-c', color: '#00599C' },
    { name: 'C', category: 'fundamentals', icon: 'fa-solid fa-c', color: '#A8B9CC' },
  ];

  readonly toolsSkills: Skill[] = [
    { name: 'Git', category: 'tools', icon: 'fa-brands fa-git-alt', color: '#F05032' },
    { name: 'GitHub', category: 'tools', icon: 'fa-brands fa-github', color: '#FFFFFF' },
    { name: 'VS Code', category: 'tools', icon: 'fa-solid fa-code', color: '#007ACC' },
    { name: 'Command Line', category: 'tools', icon: 'fa-solid fa-terminal', color: '#4AF626' },
  ];

  currentSkills = computed(() => {
    const category = this.activeCategory();
    if (category === 'frontend') return this.frontendSkills;
    if (category === 'ml') return this.mlSkills;
    if (category === 'tools') return this.toolsSkills;
    return this.fundamentalsSkills;
  });

  ngAfterViewInit(): void {
    // Calculate initial indicator dimensions after rendering
    setTimeout(() => this.updateIndicator(), 0);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateIndicator();
  }

  setCategory(category: SkillCategory): void {
    this.activeCategory.set(category);
    this.updateIndicator();
  }

  private updateIndicator(): void {
    let active: ElementRef<HTMLButtonElement> | undefined;
    const cat = this.activeCategory();
    if (cat === 'frontend') {
      active = this.frontendBtn;
    } else if (cat === 'ml') {
      active = this.mlBtn;
    } else if (cat === 'fundamentals') {
      active = this.fundamentalsBtn;
    } else if (cat === 'tools') {
      active = this.toolsBtn;
    }

    if (active && active.nativeElement) {
      const el = active.nativeElement;
      this.indicatorWidth.set(el.offsetWidth);
      this.indicatorLeft.set(el.offsetLeft);
    }
  }
}
