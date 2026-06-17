import { Injectable } from '@angular/core';

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  points: string[];
  tags: string[];
  isCurrent: boolean;
  certificate: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  readonly experiences: Experience[] = [
    {
      title: 'Data Science & AI Trainee',
      company: 'Matsuo-Iwasawa Lab U-Tokyo',
      period: 'Apr 2026 - Present',
      location: 'Tokyo, Japan · Remote',
      points: [
        'Selected for the GCI World Program by Matsuo-Iwasawa Lab (University of Tokyo) — a competitive global initiative that received 7,700+ applicants from 430+ universities across 30+ countries',
        'Python for data science: NumPy, Pandas, Matplotlib',
        'Supervised learning, model evaluation, and feature engineering',
        'SQL, unsupervised learning, and time series analysis',
        'Completed homework assignments, a Kaggle-style competition, and a final project',
      ],
      tags: ['Python', 'Machine Learning', 'Data Science', 'SQL'],
      isCurrent: true,
      certificate: null,
    },
    {
      title: 'Laravel Backend Trainee',
      company: 'SemiCodeTech',
      period: 'Jun 2026 - Present',
      location: 'Al Jizah, Egypt · On-site',
      points: [
        'Enrolled in a backend web development diploma at SemiCodeTech (96 hours / 4 months)',
        'PHP — OOP, arrays, functions, RegEx, HTTP handling',
        'MySQL — database design, relations, CRUD operations',
        'Laravel — MVC, routing, Blade templates, controllers, migrations, models',
        'Eloquent ORM & DB Query Builder',
        'Forms & validations, authentication',
        'Real-time chat with Pusher',
        'RESTful APIs with Postman',
        'Git & GitHub, CLI tools, Vite',
      ],
      tags: ['PHP', 'Laravel', 'MySQL', 'RESTful APIs', 'Pusher'],
      isCurrent: true,
      certificate: null,
    },
    {
      title: 'Angular Frontend Trainee',
      company: 'SemiCodeTech',
      period: 'Dec 2025 - May 2026',
      location: 'Egypt · On-site',
      points: [
        'Completed training in Frontend Development fundamentals',
        'Learned HTML5, CSS3, JavaScript, and TypeScript for modern web development',
        'Studied Angular framework and component-based application development',
        'Gained experience with Bootstrap 5, Sass, Git, and Object-Oriented Programming concepts',
        'Practiced building responsive and user-friendly web interfaces through training exercises',
      ],
      tags: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap'],
      isCurrent: false,
      certificate: null,
    },
    {
      title: 'Machine Learning Trainee',
      company: 'IEEE Helwan Student Branch',
      period: 'Jan 2026 - Mar 2026',
      location: 'Cairo, Egypt',
      points: [
        'Completed training in Machine Learning fundamentals and supervised learning',
        'Learned classification, regression, data preprocessing, and feature engineering concepts',
        'Worked with Python and Machine Learning libraries in training exercises',
        'Studied model evaluation techniques and performance metrics',
      ],
      tags: ['Python', 'Machine Learning', 'scikit-learn'],
      isCurrent: false,
      certificate: 'assets/certificates/IEEE.jpg',
    },
  ];

  getExperiences(): Experience[] {
    return this.experiences;
  }
}
