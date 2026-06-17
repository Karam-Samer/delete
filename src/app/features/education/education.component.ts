import { Component } from '@angular/core';

interface Education {
  degree: string;
  field: string;
  university: string;
  period: string;
  status: string;
  tags: string[];
}

@Component({
  selector: 'app-education',
  standalone: true,
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  readonly educationList: Education[] = [
    {
      degree: 'Bachelor of Computer Science and Artificial Intelligence',
      field: 'Computer Science & AI',
      university: 'Helwan University Cairo',
      period: '2024 – 2028',
      status: 'Second Year Student',
      tags: [
        'Python',
        'Algorithms',
        'Data Structures',
        'OOP',
        'Databases',
        'C++',
        'Java',
        'Mathematics',
        'Statistics',
        'Linear Algebra',
      ],
    },
  ];
}
