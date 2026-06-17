import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { EducationComponent } from './features/education/education.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class App {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Karam Samer | Frontend Developer & ML Enthusiast');

    this.meta.updateTag({
      name: 'description',
      content:
        'Personal portfolio of Karam Samer — Frontend Developer and Data Science & AI Trainee at University of Tokyo GCI Program.',
    });
  }
}
